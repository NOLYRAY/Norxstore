import webpush from 'web-push';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const RTDB_PUSH_BASE = 'https://norxstore-id-default-rtdb.asia-southeast1.firebasedatabase.app/norxstore/orders/__config_push_subscriptions__';
const LOCAL_SUBS_FILE = path.join(ROOT_DIR, 'push_subscriptions.json');

let vapid = {
  publicKey: process.env.VAPID_PUBLIC_KEY || 'BLffVdmZ4HwgMMKNL9w8vNY3uatXjCeraP4TiEtlHKQRrEE6D00Ff7yDvICWMfNZAmho0EjqaPBVOLbvNtETG8Y',
  privateKey: process.env.VAPID_PRIVATE_KEY || 'EcGmKricXU-QMgfcZ04XcfN682OZGm4wHqRKAFqq7j0'
};

try {
  const vPath = path.join(ROOT_DIR, 'vapid.json');
  if (!process.env.VAPID_PUBLIC_KEY && fs.existsSync(vPath)) {
    const parsed = JSON.parse(fs.readFileSync(vPath, 'utf8'));
    if (parsed && parsed.publicKey && parsed.privateKey) {
      vapid = parsed;
    }
  }
} catch (e) {}

webpush.setVapidDetails(
  'mailto:norxstore.support@gmail.com',
  vapid.publicKey,
  vapid.privateKey
);

export function getVapidPublicKey() {
  return vapid.publicKey;
}

export function getSubKey(endpoint) {
  return 'sub_' + crypto.createHash('sha256').update(String(endpoint || '')).digest('hex').slice(0, 28);
}

function readLocalSubscriptionsMap() {
  const map = {};
  try {
    if (fs.existsSync(LOCAL_SUBS_FILE)) {
      const arr = JSON.parse(fs.readFileSync(LOCAL_SUBS_FILE, 'utf8'));
      if (Array.isArray(arr)) {
        for (const item of arr) {
          if (item && item.subscription && item.subscription.endpoint) {
            map[getSubKey(item.subscription.endpoint)] = item;
          }
        }
      } else if (arr && typeof arr === 'object') {
        Object.assign(map, arr);
      }
    }
  } catch (e) {}
  return map;
}

function writeLocalSubscriptionRecord(key, record) {
  try {
    const current = readLocalSubscriptionsMap();
    if (record === null) {
      delete current[key];
    } else {
      current[key] = record;
    }
    const list = Object.values(current).slice(-2000);
    fs.writeFileSync(LOCAL_SUBS_FILE, JSON.stringify(list, null, 2));
  } catch (e) {}
}

export async function getAllSubscriptionsMap() {
  const merged = readLocalSubscriptionsMap();
  try {
    const res = await fetch(`${RTDB_PUSH_BASE}.json`, {
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(4000) : undefined
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        for (const k of Object.keys(data)) {
          if (data[k] && data[k].subscription && data[k].subscription.endpoint) {
            merged[k] = data[k];
          }
        }
      }
    }
  } catch (e) {}
  return merged;
}

export async function upsertSubscription({ subscription, orderIds, deviceId, isAdmin }) {
  if (!subscription || !subscription.endpoint) {
    throw new Error('Invalid subscription');
  }
  const key = getSubKey(subscription.endpoint);
  const incomingIds = Array.isArray(orderIds) ? orderIds.filter(Boolean).map(String) : [];

  let existing = null;
  try {
    const res = await fetch(`${RTDB_PUSH_BASE}/${key}.json`, {
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(3000) : undefined
    });
    if (res.ok) {
      existing = await res.json();
    }
  } catch (e) {}

  if (!existing) {
    const localMap = readLocalSubscriptionsMap();
    existing = localMap[key] || null;
  }

  const prevIds = (existing && Array.isArray(existing.orderIds)) ? existing.orderIds.map(String) : [];
  const mergedIds = Array.from(new Set([...prevIds, ...incomingIds])).slice(-100);
  const finalIsAdmin = (isAdmin === true) || !!(existing && existing.isAdmin === true);

  const record = {
    key,
    subscription,
    orderIds: mergedIds,
    deviceId: deviceId || (existing && existing.deviceId) || 'anonymous',
    isAdmin: finalIsAdmin,
    createdAt: (existing && existing.createdAt) || Date.now(),
    updatedAt: Date.now()
  };

  writeLocalSubscriptionRecord(key, record);

  try {
    await fetch(`${RTDB_PUSH_BASE}/${key}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(3500) : undefined
    });
  } catch (e) {}

  return record;
}

export async function deleteSubscription(key) {
  if (!key) return;
  writeLocalSubscriptionRecord(key, null);
  try {
    await fetch(`${RTDB_PUSH_BASE}/${key}.json`, {
      method: 'DELETE',
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(3000) : undefined
    });
  } catch (e) {}
}

export function deduplicatePushTargets(targets) {
  const byEndpoint = new Map();
  const byDevice = new Map();
  for (const t of (Array.isArray(targets) ? targets : [])) {
    if (!t || !t.subscription || !t.subscription.endpoint) continue;
    const ep = String(t.subscription.endpoint);
    const prevEp = byEndpoint.get(ep);
    if (!prevEp || (Number(t.updatedAt || 0) >= Number(prevEp.updatedAt || 0))) {
      byEndpoint.set(ep, t);
    }
  }
  const uniqueList = [];
  for (const t of byEndpoint.values()) {
    const dev = t.deviceId && t.deviceId !== 'anonymous' ? String(t.deviceId) : null;
    if (!dev) {
      uniqueList.push(t);
      continue;
    }
    const prevDev = byDevice.get(dev);
    if (!prevDev || (Number(t.updatedAt || 0) >= Number(prevDev.updatedAt || 0))) {
      byDevice.set(dev, t);
    }
  }
  return [...uniqueList, ...byDevice.values()];
}

export async function sendWebPushToTargets(targets, payloadObj) {
  const uniqueTargets = deduplicatePushTargets(targets);
  const payloadStr = JSON.stringify(payloadObj);
  let sent = 0;
  const staleKeys = [];

  await Promise.allSettled(
    uniqueTargets.map(async (target) => {
      if (!target || !target.subscription || !target.subscription.endpoint) return;
      const key = target.key || getSubKey(target.subscription.endpoint);
      try {
        await webpush.sendNotification(target.subscription, payloadStr, {
          TTL: 86400,
          timeout: 6000,
          headers: { Urgency: 'high' }
        });
        sent++;
      } catch (err) {
        if (err && (err.statusCode === 404 || err.statusCode === 410)) {
          staleKeys.push(key);
        } else {
          console.error('WebPush error:', err && err.message ? err.message : err);
        }
      }
    })
  );

  if (staleKeys.length > 0) {
    await Promise.allSettled(staleKeys.map((k) => deleteSubscription(k)));
  }

  return { sent, targetCount: uniqueTargets.length, removedStale: staleKeys.length };
}

export function applyCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (e) { return {}; }
  }
  return await new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => { raw += chunk; });
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}
