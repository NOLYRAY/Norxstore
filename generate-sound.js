import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function generateWav() {
  const sampleRate = 44100;
  const duration = 0.8; // 800ms
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = Buffer.alloc(44 + numSamples * 2);

  // WAV Header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size
  buffer.writeUInt16LE(1, 20);  // PCM format
  buffer.writeUInt16LE(1, 22);  // Mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28); // Byte rate
  buffer.writeUInt16LE(2, 32);  // Block align
  buffer.writeUInt16LE(16, 34); // Bits per sample
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  // Synthesize pleasant two-tone chime (659Hz E5 then 988Hz B5)
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = 0;
    
    // First bell tone (0 - 0.4s)
    if (t < 0.45) {
      const freq = 659.25;
      const decay = Math.exp(-t * 7);
      sample += Math.sin(2 * Math.PI * freq * t) * decay * 0.4;
      // Overtones
      sample += Math.sin(2 * Math.PI * freq * 2 * t) * decay * 0.15;
    }
    
    // Second bell tone (0.15 - 0.8s)
    if (t >= 0.15) {
      const t2 = t - 0.15;
      const freq2 = 987.77;
      const decay2 = Math.exp(-t2 * 6);
      sample += Math.sin(2 * Math.PI * freq2 * t2) * decay2 * 0.45;
      sample += Math.sin(2 * Math.PI * freq2 * 2 * t2) * decay2 * 0.18;
    }

    const clamped = Math.max(-1, Math.min(1, sample));
    const intVal = Math.floor(clamped * 32767);
    buffer.writeInt16LE(intVal, 44 + i * 2);
  }

  const paths = [
    path.join(__dirname, 'notification.wav'),
    path.join(__dirname, 'public', 'notification.wav'),
    path.join(__dirname, 'dist', 'notification.wav')
  ];

  paths.forEach(p => {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, buffer);
  });

  console.log('notification.wav generated successfully!');
}

generateWav();
