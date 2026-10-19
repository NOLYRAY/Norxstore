
let currentSelectedCountry = 'SG';
const I18N = {
  ID: {
    langName: 'Bahasa Indonesia',
    searchPlaceholder: 'Cari layanan joki...',
    searchClearTitle: 'Hapus pencarian',
    searchPenelusuran: 'Penelusuran',
    servicesLabel: 'layanan',
    noServicesFound: 'Tidak ada layanan yang cocok dengan',
    showAllServices: 'TAMPILKAN SEMUA {n} LAYANAN DI KATALOG ➔',
    countryModalTitle: 'Pilih Negara & Mata Uang',
    countryBtnTitle: 'Pilih Negara & Mata Uang',
    closeBtn: 'TUTUP',
    cartIconTitle: 'Keranjang',
    accountIconTitle: 'Akun',
    catalogTitle: '🛒 KATALOG LAYANAN',
    viewAllLink: 'LIHAT SEMUA →',
    catAll: '🛒 SEMUA',
    catAccount: '🔑 AKUN STORE',
    btnBuy: '🛒 Beli',
    btnAddCart: 'Keranjang',
    btnInCart: 'Keranjang',
    soldBadge: '🔴 TERJUAL',
    reservedBadge: '🟡 DIPESAN',
    processingBadge: '🔵 SEDANG DIPROSES',
    stock1Badge: '🔑 STOK 1',
    soldBtn: '🔴 Terjual',
    reservedBtn: '🟡 Dipesan',
    processingBtn: '🔵 Sedang Diproses',
    cartTitle: '🛒 KERANJANG BELANJA',
    tabCart: '🛒 Keranjang',
    tabMyOrders: '📦 Pesanan Saya',
    cartSubtotal: 'Subtotal',
    cartDiscount: 'Diskon',
    cartTotal: 'Total',
    cartCheckoutBtn: '💬 Checkout via WhatsApp',
    cartClear: 'Kosongkan Keranjang',
    cartBack: '← Kembali ke Keranjang',
    cartConfirmOrder: '✅ Konfirmasi & Kirim',
    cartEmptyTitle: 'Keranjang Masih Kosong',
    cartEmptySub: 'Yuk pilih dan tambahkan layanan favoritmu dari katalog!',
    cartExploreBtn: '🎮 JELAJAHI KATALOG JOKI',
    cartItemQty: 'Jumlah',
    cartItemMax: 'Maksimal 1 per layanan',
    cartRemoveTitle: 'Hapus dari keranjang',
    ordersEmptyTitle: 'Belum Ada Pesanan',
    ordersEmptySub: 'Layanan yang Anda pesan akan muncul di sini beserta status pengerjaannya secara real-time.',
    ordersViewCartBtn: '🛒 LIHAT KERANJANG BELANJA',
    payMethodLabel: 'Metode Pembayaran',
    chatAdminLabel: 'Chat ke Admin',
    waPreviewLabel: 'Pesan WhatsApp',
    waSendBtn: '💬 Kirim ke WhatsApp',
    modalHeaderTitle: 'PILIH METODE PEMBAYARAN',
    viewFullPhoto: '🔍 Lihat Foto Ukuran Penuh',
    testiBadge: '⭐ REPUTASI & KEPUASAN PELANGGAN',
    testiTitle: 'TESTIMONI & RATING KEPUASAN',
    testiDone: 'Jokian Selesai',
    testiSatisfied: 'Puas (Bintang 4-5)',
    testiWriteBtn: '✍️ BERI BINTANG & ULASAN JOKIAN',
    tabTestiReviews: '⭐ Ulasan Pelanggan',
    tabTestiProofs: '📸 Bukti Chat / Transfer',
    ratingStartingEmpty: 'Rating Mulai 0 · Belum Ada Penilaian',
    ratingCountFormat: '⭐ {avg} / 5.0 · {total} Penilaian Pelanggan',
    statDoneWord: 'Selesai',
    testiEmptyTitle: 'Rating Masih 0 (Belum Ada Penilaian)',
    testiEmptyDesc: 'Sistem otomatis aktif! Begitu jokian Anda selesai dikerjakan, Anda dapat memberikan bintang kepuasan dan rating toko akan bertambah otomatis.',
    testiEmptyBtn: '⭐ Beri Bintang Pertama Sekarang',
    verifiedReviewBadge: '🟢 Terverifikasi',
    defaultServiceReview: 'Layanan Joki Game',
    reviewPlaceholderText: 'Pelanggan memberikan rating ⭐ {starCount} bintang untuk layanan ini.',
    translateReviewBtn: 'Terjemahkan',
    showOriginalReviewBtn: 'Tampilkan Teks Asli',
    translatedBadge: 'Diterjemahkan',
    translateAllReviewsBtn: 'Terjemahkan Semua',
    showAllOriginalReviewsBtn: 'Tampilkan Semua Teks Asli',
    reviewListHeader: 'Ulasan Pelanggan ({n})',
    modalGiveRatingTitle: '⭐ Beri Bintang & Ulasan Jokian',
    modalGiveRatingSubtitle: 'Rating Anda akan otomatis dihitung dan menaikkan bintang toko secara transparan dan real-time.',
    modalSelectServiceLabel: 'Layanan / Jokian:',
    modalSelectServiceDefault: '-- Pilih Dari Pesanan Selesai Anda --',
    modalSelectStarTitle: 'PILIH BINTANG KEPUASAN:',
    modalNameLabel: 'Nama Anda / In-Game Name:',
    modalReviewLabel: 'Ulasan / Pengalaman Jokian:',
    modalReviewPlaceholder: 'Ceritakan bagaimana pengerjaan jokian Anda... (cepat, akun aman, ramah, dll.)',
    modalSubmitBtn: '⭐ Kirim Bintang & Naikkan Rating',
    waGreeting: 'Halo Admin NORXSTORE, saya ingin memesan',
    waWithPrice: 'dengan harga',
    waEquivalent: 'setara',
    waAndPayment: 'dan pembayaran via',
    waClosing: 'Mohon konfirmasi ketersediaannya, terima kasih!',
    toastCountryChanged: 'Negara & Bahasa diubah ke',
    modeCatalog: '☀️ Katalog',
    modeTesti: '🌙 Testimoni',
    sgPopTitle: 'Sub-Kategori',
    sgPopSubtitle: 'Pilih sub-kategori untuk {game}',
    sgPopAllName: 'Semua {game}',
    sgPopAllDesc: 'Tampilkan seluruh varian & paket',
    sgPopItemDesc: 'Layanan kategori {sub}',
    sgPopItemCount: '{n} produk',
    sgPopOtherName: 'Lainnya / Reguler',
    sgPopOtherDesc: 'Layanan reguler tanpa sub-kategori',
    sgBarLabel: 'Sub-Kategori:',
    sgBarChange: 'Ganti',
    sgBarAllBtn: '✕ Semua {game}',
    sgToastShowing: 'Menampilkan: {label}',
    catDiscount: 'DISKON',
    sgPopDiscountOption: '🔥 Khusus Diskon {game}',
    sgPopDiscountDesc: 'Tampilkan varian {game} yang sedang promo diskon',
    sgPopDiscBadge: 'Diskon {n}%',
    subDiscBadge: '🔥 DISKON {n}%',
    subAllBtn: '🌟 Semua {game}',
    subMoreBtn: '📑 Menu Lengkap ▾',
    subPromoText: '⚡ Promo Diskon {n}% · {c} layanan',
    subCountText: '{c} layanan tersedia',
    subScrollPrev: 'Geser ke kiri',
    subScrollNext: 'Geser ke kanan',
    socialKicker: '🌐 KOMUNITAS & MEDIA SOSIAL RESMI',
    socialHeading: 'Ikuti Media Sosial Resmi NORXSTORE',
    socialSubtitle: 'Dapatkan info promo kilat, restock akun, event giveaway, & bantuan customer service langsung.',
    scamWarningTitle: 'Waspada Penipuan Mengatasnamakan NORXSTORE!',
    scamWarningDesc: 'Transaksi dan konsultasi resmi HANYA dilakukan melalui kontak dan tautan akun media sosial yang tertera di halaman ini. Kami tidak pernah meminta password email Anda di luar sistem joki yang aman.',
    scamShieldBadge: '🛡️ RESMI & AMAN',
    liveVisitorsTitle: 'Pengunjung aktif di website saat ini',
    socialBtnOpen: 'Kunjungi ➔',
    socialBtnChat: 'Chat WhatsApp ➔',
    socialBtnCopy: 'Salin',
    socialCopied: 'Disalin! ✓',
    socialModalTitle: 'Media Sosial & Komunitas',
    socialModalSub: 'Semua channel resmi terverifikasi NORXSTORE',
    socialModalScam: 'Semua channel di bawah ini adalah <strong>kontak & akun resmi terverifikasi</strong> NORXSTORE. Waspada akun palsu!',
    socialNavBtn: 'Medsos',
    socialFloatingBtn: 'Medsos & CS',

    // New keys for complete localization
    priceRangeHint: '💡 Rentang harga {price} (menyesuaikan varian/jumlah saat chat)',
    savingsLabel: 'Hemat',
    orderProcessingNotice: '⏳ Layanan ini sedang diproses. Belum bisa dipesan lagi sampai selesai.',
    orderWaitFinishedNotice: '⚠️ Pesanan produk ini sebelumnya belum selesai dikerjakan. Belum bisa dipesan lagi!',
    selectPaymentFirst: 'Pilih metode pembayaran dulu!',
    selectAdminFirst: 'Pilih admin tujuan chat dulu!',
    redirectingWa: 'Mengarahkan ke WhatsApp...',
    clearCartConfirm: 'Yakin ingin mengosongkan keranjang?',
    cartEmptiedToast: 'Keranjang dikosongkan',
    accountSoldToast: 'Akun ini sudah terjual',
    accountReservedToast: 'Akun ini sedang dipesan orang lain, coba lagi nanti',
    orderFinishedTitle: 'Pesanan Anda Telah Selesai!',
    orderFinishedSub: 'Admin telah menyelesaikan pengerjaan layanan Anda. Berikan bintang kepuasan Anda di bawah untuk menaikkan rating toko!',
    orderRatingTitle: '⭐ Beri Bintang Kepuasan Jokian:',
    orderRatingSubmitBtn: '⭐ Kirim Bintang & Naikkan Rating',
    orderRatingDoneNotice: '✅ Anda sudah memberikan rating untuk pesanan ini',
    orderRatingThankYou: 'Terima kasih atas kepercayaan Anda di Norxstore!',
    phoneNotifTitle: 'Notifikasi HP (Suara & Getar)',
    phoneNotifActiveDesc: 'Ponsel Anda akan otomatis bergetar & berdering saat pesanan selesai meski web ditutup.',
    phoneNotifInactiveDesc: 'Tekan untuk mengaktifkan suara & getar di HP saat pesanan selesai meski web ditutup.',
    phoneNotifBtnActive: '✅ Notif HP Aktif',
    phoneNotifBtnInactive: '🔔 Aktifkan Notif HP',
    orderStatusPending: '🟡 Menunggu Konfirmasi',
    orderStatusProcessing: '🔵 Sedang Diproses',
    orderStatusCancelled: '🔴 Dibatalkan',
    orderStatusDone: '🟢 Selesai',
    orderBtnCancel: '✕ Batalkan',
    orderBtnDelete: '🗑️ Hapus Riwayat',
    orderBtnRate: '⭐ Beri Bintang',
    orderAlreadyRated: '⭐ Sudah Dinilai',

    // Footer keys
    footerPillar1Title: 'Pengiriman Instan & Cepat',
    footerPillar1Desc: 'Pesanan diproses otomatis 24 jam nonstop dengan estimasi pengerjaan kilat.',
    footerPillar2Title: '100% Legal & Terpercaya',
    footerPillar2Desc: 'Garansi anti-banned resmi & keamanan data akun terjamin amanah 100%.',
    footerPillar3Title: 'Metode Bayar Lengkap',
    footerPillar3Desc: 'QRIS, E-Wallet, VA Bank, FPX, PayNow & pembayaran instan lokal.',
    footerPillar4Title: 'Customer Support 24/7',
    footerPillar4Desc: 'Admin ramah siap sedia mendampingi order Anda hingga selesai.',
    footerBrandDesc: 'Platform terpercaya untuk top-up game, jasa joki profesional, dan jual beli akun game amanah se-Asia Tenggara. Transaksi cepat, amanah, dan bergaransi resmi.',
    footerHoursBadge: '🟢 Buka 24 Jam Setiap Hari',
    footerOnlineCount: 'Orang Sedang Online di Web',
    footerColNavTitle: 'PETA SITUS & KATALOG',
    footerColHelpTitle: 'PUSAT BANTUAN & KEBIJAKAN',
    footerColPayTitle: 'PEMBAYARAN & KOMUNITAS',
    footerLinkAll: '🛒 Semua Layanan Game',
    footerLinkGenshin: '✨ Genshin Impact',
    footerLinkHsr: '🚀 Honkai: Star Rail',
    footerLinkWuwa: '🌊 Wuthering Waves',
    footerLinkNte: '🔮 Neverness to Everness',
    footerLinkAccount: '🔑 Akun Store & Starter',
    footerLinkReviews: '⭐ Ulasan & Testimoni',
    footerLinkTrack: '📦 Lacak Status Pesanan',
    footerLinkGuide: '📖 Panduan Cara Pemesanan',
    footerLinkTerms: '⚖️ Syarat & Ketentuan Layanan',
    footerLinkPrivacy: '🔒 Kebijakan Privasi & Garansi',
    footerLinkCs: '💬 Hubungi Customer Support',
    footerLinkReport: '🚩 Lapor Kendala Pesanan',
    footerPayMethodsTitle: 'Metode Pembayaran Resmi:',
    footerSocialTitle: 'Komunitas & Media Sosial:',
    footerDisclaimer: 'NORXSTORE adalah platform independen penyedia layanan game. Seluruh hak cipta, nama dagang, dan aset game adalah milik penerbit masing-masing (HoYoverse, Kuro Games, Hotta Studio).',
    footerRights: 'Hak Cipta Dilindungi Undang-Undang.',
    infoGuideTitle: '📖 Panduan Cara Pemesanan',
    infoTermsTitle: '⚖️ Syarat & Ketentuan Layanan',
    infoPrivacyTitle: '🔒 Kebijakan Privasi & Garansi',
    infoReportTitle: '🚩 Lapor Kendala Pesanan',
    btnOrderNow: '🛒 Pesan Sekarang',
    orderNotifClose: '✕ Tutup Jendela',
    orderNotifHistory: '🛒 Buka Riwayat Pesanan'
  },
  MY: {
    langName: 'Bahasa Melayu',
    searchPlaceholder: 'Cari perkhidmatan joki & akaun...',
    searchClearTitle: 'Padam carian',
    searchPenelusuran: 'Carian',
    servicesLabel: 'perkhidmatan',
    noServicesFound: 'Tiada perkhidmatan yang sepadan dengan',
    showAllServices: 'PAPAR SEMUA {n} PERKHIDMATAN DALAM KATALOG ➔',
    countryModalTitle: 'Pilih Negara & Mata Wang',
    countryBtnTitle: 'Pilih Negara & Mata Wang',
    closeBtn: 'TUTUP',
    cartIconTitle: 'Troli',
    accountIconTitle: 'Akaun',
    catalogTitle: '🛒 KATALOG PERKHIDMATAN',
    viewAllLink: 'LIHAT SEMUA →',
    catAll: '🛒 SEMUA',
    catAccount: '🔑 KEDAI AKAUN',
    btnBuy: '🛒 Beli',
    btnAddCart: 'Troli',
    btnInCart: 'Troli',
    soldBadge: '🔴 TELAH DIJUAL',
    reservedBadge: '🟡 TELAH DITEMPAH',
    processingBadge: '🔵 SEDANG DIPROSES',
    stock1Badge: '🔑 BAKI 1',
    soldBtn: '🔴 Telah Dijual',
    reservedBtn: '🟡 Telah Ditempah',
    processingBtn: '🔵 Sedang Diproses',
    cartTitle: '🛒 TROLI BELANJA',
    tabCart: '🛒 Troli',
    tabMyOrders: '📦 Pesanan Saya',
    cartSubtotal: 'Subjumlah',
    cartDiscount: 'Diskaun',
    cartTotal: 'Jumlah',
    cartCheckoutBtn: '💬 Checkout melalui WhatsApp',
    cartClear: 'Kosongkan Troli',
    cartBack: '← Kembali ke Troli',
    cartConfirmOrder: '✅ Sahkan & Hantar',
    cartEmptyTitle: 'Troli Masih Kosong',
    cartEmptySub: 'Jom pilih dan tambah perkhidmatan kegemaran anda dari katalog!',
    cartExploreBtn: '🎮 TEROKAI KATALOG JOKI',
    cartItemQty: 'Kuantiti',
    cartItemMax: 'Maksimum 1 bagi setiap perkhidmatan',
    cartRemoveTitle: 'Keluarkan dari troli',
    ordersEmptyTitle: 'Tiada Pesanan Lagi',
    ordersEmptySub: 'Perkhidmatan yang anda pesan akan dipaparkan di sini berserta status kerja secara masa nyata.',
    ordersViewCartBtn: '🛒 LIHAT TROLI BELANJA',
    payMethodLabel: 'Kaedah Pembayaran',
    chatAdminLabel: 'Sembang dengan Admin',
    waPreviewLabel: 'Mesej WhatsApp',
    waSendBtn: '💬 Hantar ke WhatsApp',
    modalHeaderTitle: 'PILIH KAEDAH PEMBAYARAN',
    viewFullPhoto: '🔍 Lihat Foto Saiz Penuh',
    testiBadge: '⭐ REPUTASI & KEPUASAN PELANGGAN',
    testiTitle: 'TESTIMONI & PENILAIAN PELANGGAN',
    testiDone: 'Joki Siap',
    testiSatisfied: 'Berpuas Hati (Bintang 4-5)',
    testiWriteBtn: '✍️ BERI BINTANG & PENILAIAN JOKI',
    tabTestiReviews: '⭐ Penilaian Pelanggan',
    tabTestiProofs: '📸 Bukti Sembang / Resit',
    ratingStartingEmpty: 'Penilaian Bermula 0 · Tiada Penilaian Lagi',
    ratingCountFormat: '⭐ {avg} / 5.0 · {total} Penilaian Pelanggan',
    statDoneWord: 'Siap',
    testiEmptyTitle: 'Penilaian Masih 0 (Tiada Penilaian Lagi)',
    testiEmptyDesc: 'Sistem automatik aktif! Sebaik sahaja joki anda siap dilaksanakan, anda boleh memberikan bintang kepuasan dan penilaian kedai akan dikemas kini secara automatik.',
    testiEmptyBtn: '⭐ Beri Bintang Pertama Sekarang',
    verifiedReviewBadge: '🟢 Disahkan',
    defaultServiceReview: 'Perkhidmatan Joki Game',
    reviewPlaceholderText: 'Pelanggan memberikan penilaian ⭐ {starCount} bintang untuk perkhidmatan ini.',
    translateReviewBtn: 'Terjemahkan ke BM',
    showOriginalReviewBtn: 'Papar Teks Asal',
    translatedBadge: 'Diterjemahkan ke Bahasa Melayu',
    translateAllReviewsBtn: 'Terjemahkan Semua ke BM',
    showAllOriginalReviewsBtn: 'Papar Semua Teks Asal',
    reviewListHeader: 'Penilaian Pelanggan ({n})',
    modalGiveRatingTitle: '⭐ Beri Bintang & Penilaian Joki',
    modalGiveRatingSubtitle: 'Penilaian anda akan dikira secara automatik dan menaikkan bintang kedai secara telus dan masa nyata.',
    modalSelectServiceLabel: 'Perkhidmatan / Joki:',
    modalSelectServiceDefault: '-- Pilih Dari Pesanan Selesai Anda --',
    modalSelectStarTitle: 'PILIH BINTANG KEPUASAN:',
    modalNameLabel: 'Nama Anda / In-Game Name:',
    modalReviewLabel: 'Ulasan / Pengalaman Joki:',
    modalReviewPlaceholder: 'Ceritakan bagaimana pelaksanaan joki anda... (pantas, akaun selamat, mesra, dll.)',
    modalSubmitBtn: '⭐ Hantar Bintang & Naikkan Penilaian',
    waGreeting: 'Halo Admin NORXSTORE, saya ingin membuat pesanan',
    waWithPrice: 'pada harga',
    waEquivalent: 'bersamaan',
    waAndPayment: 'dan pembayaran melalui',
    waClosing: 'Sila sahkan ketersediaan, terima kasih!',
    toastCountryChanged: 'Negara & Bahasa ditukar kepada',
    modeCatalog: '☀️ Katalog',
    modeTesti: '🌙 Penilaian',
    sgPopTitle: 'Sub-Kategori',
    sgPopSubtitle: 'Pilih sub-kategori untuk {game}',
    sgPopAllName: 'Semua {game}',
    sgPopAllDesc: 'Papar semua varian & pakej',
    sgPopItemDesc: 'Perkhidmatan kategori {sub}',
    sgPopItemCount: '{n} produk',
    sgPopOtherName: 'Lain-lain / Biasa',
    sgPopOtherDesc: 'Perkhidmatan biasa tanpa sub-kategori',
    sgBarLabel: 'Sub-Kategori:',
    sgBarChange: 'Tukar',
    sgBarAllBtn: '✕ Semua {game}',
    sgToastShowing: 'Memaparkan: {label}',
    catDiscount: 'DISKAUN',
    sgPopDiscountOption: '🔥 Khas Diskaun {game}',
    sgPopDiscountDesc: 'Papar varian {game} yang sedang promosi diskaun',
    sgPopDiscBadge: 'Diskaun {n}%',
    subDiscBadge: '🔥 DISKAUN {n}%',
    subAllBtn: '🌟 Semua {game}',
    subMoreBtn: '📑 Menu Penuh ▾',
    subPromoText: '⚡ Promosi Diskaun {n}% · {c} perkhidmatan',
    subCountText: '{c} perkhidmatan tersedia',
    subScrollPrev: 'Geser ke kiri',
    subScrollNext: 'Geser ke kanan',
    socialKicker: '🌐 KOMUNITI & MEDIA SOSIAL RASMI',
    socialHeading: 'Ikuti Media Sosial Rasmi NORXSTORE',
    socialSubtitle: 'Dapatkan maklumat promosi kilat, restock akaun, event giveaway, & bantuan khidmat pelanggan secara langsung.',
    scamWarningTitle: 'Berwaspada Terhadap Penipuan Mengatasnamakan NORXSTORE!',
    scamWarningDesc: 'Transaksi dan perbincangan rasmi HANYA dijalankan melalui kenalan dan pautan media sosial yang tertera di halaman ini. Kami tidak pernah meminta kata laluan e-mel anda di luar sistem joki yang selamat.',
    scamShieldBadge: '🛡️ RASMI & SELAMAT',
    liveVisitorsTitle: 'Pelawat aktif di laman web sekarang',
    socialBtnOpen: 'Lawati ➔',
    socialBtnChat: 'Sembang WhatsApp ➔',
    socialBtnCopy: 'Salin',
    socialCopied: 'Disalin! ✓',
    socialModalTitle: 'Media Sosial & Komuniti',
    socialModalSub: 'Semua saluran rasmi terverifikasi NORXSTORE',
    socialModalScam: 'Semua saluran di bawah ini adalah <strong>kenalan & akaun rasmi disahkan</strong> NORXSTORE. Waspada akaun palsu!',
    socialNavBtn: 'Medsos',
    socialFloatingBtn: 'Medsos & CS',

    // New keys for MY
    priceRangeHint: '💡 Julat harga {price} (mengikut varian/kuantiti semasa sembang)',
    savingsLabel: 'Penjimatan',
    orderProcessingNotice: '⏳ Perkhidmatan ini sedang diproses. Belum boleh dipesan lagi sehingga selesai.',
    orderWaitFinishedNotice: '⚠️ Pesanan perkhidmatan ini sebelum ini belum siap. Belum boleh ditempah lagi!',
    selectPaymentFirst: 'Sila pilih kaedah pembayaran dahulu!',
    selectAdminFirst: 'Sila pilih admin sokongan dahulu!',
    redirectingWa: 'Mengarahkan ke WhatsApp...',
    clearCartConfirm: 'Adakah anda pasti mahu mengosongkan troli?',
    cartEmptiedToast: 'Troli telah dikosongkan',
    accountSoldToast: 'Akaun ini telah habis dijual',
    accountReservedToast: 'Akaun ini sedang ditempah oleh pelanggan lain, sila cuba sebentar lagi',
    orderFinishedTitle: 'Pesanan Anda Telah Siap!',
    orderFinishedSub: 'Admin telah menyelesaikan perkhidmatan anda. Sila beri bintang kepuasan anda di bawah untuk menaikkan rating kedai!',
    orderRatingTitle: '⭐ Beri Bintang Kepuasan Joki:',
    orderRatingSubmitBtn: '⭐ Hantar Bintang & Naikkan Rating',
    orderRatingDoneNotice: '✅ Anda telah memberikan penilaian bagi pesanan ini',
    orderRatingThankYou: 'Terima kasih atas sokongan dan kepercayaan anda di Norxstore!',
    phoneNotifTitle: 'Notifikasi Telefon Pintar',
    phoneNotifActiveDesc: 'Telefon anda akan bergetar & berdering secara automatik apabila pesanan siap walaupun web ditutup.',
    phoneNotifInactiveDesc: 'Tekan untuk aktifkan bunyi & getaran apabila pesanan anda siap walaupun web ditutup.',
    phoneNotifBtnActive: '✅ Notif Telefon Aktif',
    phoneNotifBtnInactive: '🔔 Aktifkan Notif Telefon',
    orderStatusPending: '🟡 Menunggu Pengesahan',
    orderStatusProcessing: '🔵 Sedang Diproses',
    orderStatusCancelled: '🔴 Dibatalkan',
    orderStatusDone: '🟢 Siap',
    orderBtnCancel: '✕ Batalkan',
    orderBtnDelete: '🗑️ Padam Sejarah',
    orderBtnRate: '⭐ Beri Penilaian',
    orderAlreadyRated: '⭐ Telah Dinilai',

    // Footer keys for MY
    footerPillar1Title: 'Penghantaran Segera & Pantas',
    footerPillar1Desc: 'Pesanan diproses automatik 24 jam tanpa henti dengan anggaran siap terpantas.',
    footerPillar2Title: '100% Sah & Dipercayai',
    footerPillar2Desc: 'Jaminan rasmi anti-banned & keselamatan data akaun terjamin 100%.',
    footerPillar3Title: 'Pelbagai Kaedah Bayaran',
    footerPillar3Desc: 'Touch \'n Go eWallet, DuitNow QR, FPX, Maybank2u & perbankan dalam talian.',
    footerPillar4Title: 'Khidmat Pelanggan 24/7',
    footerPillar4Desc: 'Pasukan admin sedia membantu dan membimbing order anda pada bila-bila masa.',
    footerBrandDesc: 'Platform dipercayai untuk tambah nilai game, servis joki profesional, dan jual beli akaun game selamat di seluruh Asia Tenggara. Transaksi pantas dan bergaransi rasmi.',
    footerHoursBadge: '🟢 Beroperasi 24 Jam Setiap Hari',
    footerOnlineCount: 'Pemain Sedang Dalam Talian',
    footerColNavTitle: 'PAUTAN PANTAS & KATALOG',
    footerColHelpTitle: 'PUSAT BANTUAN & DASAR',
    footerColPayTitle: 'BAYARAN & KOMUNITI',
    footerLinkAll: '🛒 Semua Perkhidmatan Game',
    footerLinkGenshin: '✨ Genshin Impact',
    footerLinkHsr: '🚀 Honkai: Star Rail',
    footerLinkWuwa: '🌊 Wuthering Waves',
    footerLinkNte: '🔮 Neverness to Everness',
    footerLinkAccount: '🔑 Kedai Akaun & Starter',
    footerLinkReviews: '⭐ Penilaian & Testimoni',
    footerLinkTrack: '📦 Semak Status Pesanan',
    footerLinkGuide: '📖 Panduan Cara Membuat Pesanan',
    footerLinkTerms: '⚖️ Terma & Syarat Perkhidmatan',
    footerLinkPrivacy: '🔒 Dasar Privasi & Jaminan',
    footerLinkCs: '💬 Hubungi Khidmat Pelanggan',
    footerLinkReport: '🚩 Lapor Masalah Pesanan',
    footerPayMethodsTitle: 'Kaedah Pembayaran Rasmi:',
    footerSocialTitle: 'Saluran Komuniti Rasmi:',
    footerDisclaimer: 'NORXSTORE adalah platform bebas perkhidmatan game. Semua hak cipta dan tanda dagangan adalah hak milik penerbit masing-masing (HoYoverse, Kuro Games, Hotta Studio).',
    footerRights: 'Hak Cipta Terpelihara.',
    infoGuideTitle: '📖 Panduan Cara Membuat Pesanan',
    infoTermsTitle: '⚖️ Terma & Syarat Perkhidmatan',
    infoPrivacyTitle: '🔒 Dasar Privasi & Jaminan',
    infoReportTitle: '🚩 Lapor Masalah Pesanan',
    btnOrderNow: '🛒 Pesan Sekarang',
    orderNotifClose: '✕ Tutup Tetingkap',
    orderNotifHistory: '🛒 Buka Sejarah Pesanan'
  },
  SG: {
    langName: 'English (Singapore)',
    searchPlaceholder: 'Search services, boosts, top-ups...',
    searchClearTitle: 'Clear search',
    searchPenelusuran: 'Search',
    servicesLabel: 'services',
    noServicesFound: 'No services found matching',
    showAllServices: 'VIEW ALL {n} SERVICES IN CATALOG ➔',
    countryModalTitle: 'Select Country & Currency',
    countryBtnTitle: 'Select Country & Currency',
    closeBtn: 'CLOSE',
    cartIconTitle: 'Cart',
    accountIconTitle: 'Account',
    catalogTitle: '🛒 SERVICES CATALOG',
    viewAllLink: 'VIEW ALL →',
    catAll: '🛒 ALL SERVICES',
    catAccount: '🔑 ACCOUNTS STORE',
    btnBuy: '🛒 Buy',
    btnAddCart: 'Cart',
    btnInCart: 'In Cart',
    soldBadge: '🔴 SOLD OUT',
    reservedBadge: '🟡 RESERVED',
    processingBadge: '🔵 PROCESSING',
    stock1Badge: '🔑 1 IN STOCK',
    soldBtn: '🔴 Sold Out',
    reservedBtn: '🟡 Reserved',
    processingBtn: '🔵 Processing',
    cartTitle: '🛒 SHOPPING CART',
    tabCart: '🛒 Cart',
    tabMyOrders: '📦 My Orders',
    cartSubtotal: 'Subtotal',
    cartDiscount: 'Discount',
    cartTotal: 'Total',
    cartCheckoutBtn: '💬 Checkout via WhatsApp',
    cartClear: 'Empty Cart',
    cartBack: '← Back to Cart',
    cartConfirmOrder: '✅ Confirm & Send',
    cartEmptyTitle: 'Shopping Cart is Empty',
    cartEmptySub: 'Explore our catalog and add your favorite services now!',
    cartExploreBtn: '🎮 EXPLORE SERVICES CATALOG',
    cartItemQty: 'Qty',
    cartItemMax: 'Maximum 1 per service',
    cartRemoveTitle: 'Remove from cart',
    ordersEmptyTitle: 'No Orders Yet',
    ordersEmptySub: 'Your ordered services and real-time progress will appear here.',
    ordersViewCartBtn: '🛒 VIEW SHOPPING CART',
    payMethodLabel: 'Payment Method',
    chatAdminLabel: 'Chat with Admin',
    waPreviewLabel: 'WhatsApp Message',
    waSendBtn: '💬 Send to WhatsApp',
    modalHeaderTitle: 'SELECT PAYMENT METHOD',
    viewFullPhoto: '🔍 View Full Size Photo',
    testiBadge: '⭐ REPUTATION & SATISFACTION',
    testiTitle: 'TESTIMONIALS & CUSTOMER RATINGS',
    testiDone: 'Orders Completed',
    testiSatisfied: 'Satisfied (4-5 Stars)',
    testiWriteBtn: '✍️ RATE & REVIEW OUR SERVICE',
    tabTestiReviews: '⭐ Customer Reviews',
    tabTestiProofs: '📸 Chat & Payment Proofs',
    ratingStartingEmpty: 'Starting Rating 0 · No Ratings Yet',
    ratingCountFormat: '⭐ {avg} / 5.0 · {total} Customer Ratings',
    statDoneWord: 'Completed',
    testiEmptyTitle: 'Rating is 0 (No Reviews Yet)',
    testiEmptyDesc: 'Automatic system active! Once your order is completed, you can submit your satisfaction rating and the store rating will update automatically.',
    testiEmptyBtn: '⭐ Give First Rating Now',
    verifiedReviewBadge: '🟢 Verified',
    defaultServiceReview: 'Game Boost Service',
    reviewPlaceholderText: 'Customer gave a ⭐ {starCount}-star rating for this service.',
    translateReviewBtn: 'Translate to English',
    showOriginalReviewBtn: 'Show Original',
    translatedBadge: 'Translated to English',
    translateAllReviewsBtn: 'Translate All to English',
    showAllOriginalReviewsBtn: 'Show All Original',
    reviewListHeader: 'Customer Reviews ({n})',
    modalGiveRatingTitle: '⭐ Rate & Review Your Order',
    modalGiveRatingSubtitle: 'Your rating will be automatically calculated to improve our store rating transparently and in real-time.',
    modalSelectServiceLabel: 'Ordered Service:',
    modalSelectServiceDefault: '-- Select From Your Completed Orders --',
    modalSelectStarTitle: 'SELECT SATISFACTION RATING:',
    modalNameLabel: 'Your Name / In-Game Nickname:',
    modalReviewLabel: 'Review / Order Experience:',
    modalReviewPlaceholder: 'Share how your order went... (fast, safe account, friendly service, etc.)',
    modalSubmitBtn: '⭐ Submit Rating & Review',
    waGreeting: 'Hello Admin NORXSTORE, I would like to order',
    waWithPrice: 'for',
    waEquivalent: 'equivalent to',
    waAndPayment: 'with payment via',
    waClosing: 'Please confirm availability, thank you!',
    toastCountryChanged: 'Country & Language changed to',
    modeCatalog: '☀️ Catalog',
    modeTesti: '🌙 Testimonials',
    sgPopTitle: 'Sub-Category',
    sgPopSubtitle: 'Select sub-category for {game}',
    sgPopAllName: 'All {game}',
    sgPopAllDesc: 'Show all variants & packages',
    sgPopItemDesc: 'Services under {sub} category',
    sgPopItemCount: '{n} product(s)',
    sgPopOtherName: 'Others / Regular',
    sgPopOtherDesc: 'Regular services without sub-category',
    sgBarLabel: 'Sub-Category:',
    sgBarChange: 'Change',
    sgBarAllBtn: '✕ All {game}',
    sgToastShowing: 'Showing: {label}',
    catDiscount: 'SALE',
    sgPopDiscountOption: '🔥 {game} On Sale',
    sgPopDiscountDesc: 'Show {game} variants with active discount',
    sgPopDiscBadge: 'Sale {n}%',
    subDiscBadge: '🔥 SALE {n}%',
    subAllBtn: '🌟 All {game}',
    subMoreBtn: '📑 All Sub-Categories ▾',
    subPromoText: '⚡ Promo {n}% Off · {c} services',
    subCountText: '{c} services available',
    subScrollPrev: 'Scroll left',
    subScrollNext: 'Scroll right',
    socialKicker: '🌐 OFFICIAL COMMUNITY & SOCIAL MEDIA',
    socialHeading: 'Follow Official NORXSTORE Channels',
    socialSubtitle: 'Get the latest promo drops, account restocks, giveaways & direct customer support.',
    scamWarningTitle: 'Beware of Impersonation & Scams!',
    scamWarningDesc: 'Official transactions and support are STRICTLY conducted through the verified contacts and links listed on this page. We never request your email passwords arbitrarily.',
    scamShieldBadge: '🛡️ OFFICIAL & VERIFIED',
    liveVisitorsTitle: 'Active visitors browsing the store right now',
    socialBtnOpen: 'Visit ➔',
    socialBtnChat: 'Chat WhatsApp ➔',
    socialBtnCopy: 'Copy',
    socialCopied: 'Copied! ✓',
    socialModalTitle: 'Official Social & Community',
    socialModalSub: 'All verified official NORXSTORE channels',
    socialModalScam: 'All channels listed below are <strong>strictly verified official contacts</strong> of NORXSTORE. Beware of fake accounts!',
    socialNavBtn: 'Social',
    socialFloatingBtn: 'Social & CS',

    // New keys for SG (Singapore / English)
    priceRangeHint: '💡 Price range {price} (depends on variant/quantity upon chat)',
    savingsLabel: 'Savings',
    orderProcessingNotice: '⏳ This service is currently being processed. Cannot be re-ordered until completed.',
    orderWaitFinishedNotice: '⚠️ A previous order for this service is still in progress. Please wait until completed!',
    selectPaymentFirst: 'Please select a payment method first!',
    selectAdminFirst: 'Please select a support admin first!',
    redirectingWa: 'Redirecting to WhatsApp...',
    clearCartConfirm: 'Are you sure you want to empty your cart?',
    cartEmptiedToast: 'Shopping cart has been emptied',
    accountSoldToast: 'This account has already been sold',
    accountReservedToast: 'This account is currently reserved by another customer, please check back later',
    orderFinishedTitle: 'Your Order Has Been Completed!',
    orderFinishedSub: 'Our team has completed your order! Please submit your satisfaction rating below to help support our store!',
    orderRatingTitle: '⭐ Rate Your Service Experience:',
    orderRatingSubmitBtn: '⭐ Submit Rating & Boost Score',
    orderRatingDoneNotice: '✅ You have already submitted a review for this order',
    orderRatingThankYou: 'Thank you for choosing NORXSTORE!',
    phoneNotifTitle: 'Mobile Push Alerts (Sound & Vibrate)',
    phoneNotifActiveDesc: 'Your device will automatically vibrate & sound when your order finishes, even if the web is closed.',
    phoneNotifInactiveDesc: 'Tap to enable sound & vibration alerts when your order finishes.',
    phoneNotifBtnActive: '✅ Mobile Alerts Active',
    phoneNotifBtnInactive: '🔔 Enable Mobile Alerts',
    orderStatusPending: '🟡 Awaiting Confirmation',
    orderStatusProcessing: '🔵 In Progress',
    orderStatusCancelled: '🔴 Cancelled',
    orderStatusDone: '🟢 Completed',
    orderBtnCancel: '✕ Cancel',
    orderBtnDelete: '🗑️ Delete History',
    orderBtnRate: '⭐ Rate Order',
    orderAlreadyRated: '⭐ Rated',

    // Footer keys for SG
    footerPillar1Title: 'Instant & Fast Delivery',
    footerPillar1Desc: 'Automated order processing 24/7 non-stop with rapid turnaround time.',
    footerPillar2Title: '100% Legal & Secure',
    footerPillar2Desc: 'Official anti-banned guarantee & complete customer account privacy.',
    footerPillar3Title: 'Multi-Currency & Local Pay',
    footerPillar3Desc: 'PayNow QR, GrabPay, DBS PayLah!, Cards & major payment channels.',
    footerPillar4Title: '24/7 Dedicated Support',
    footerPillar4Desc: 'Friendly gaming support team available anytime to assist your orders.',
    footerBrandDesc: 'Southeast Asia\'s leading destination for game top-ups, rank boosting, and safe account trading. Fast automated checkout, competitive rates, and full official warranty.',
    footerHoursBadge: '🟢 Open 24/7 Everyday',
    footerOnlineCount: 'Gamers Online on Site',
    footerColNavTitle: 'QUICK LINKS & CATALOG',
    footerColHelpTitle: 'CUSTOMER CARE & POLICIES',
    footerColPayTitle: 'PAYMENT & COMMUNITY',
    footerLinkAll: '🛒 All Game Services',
    footerLinkGenshin: '✨ Genshin Impact',
    footerLinkHsr: '🚀 Honkai: Star Rail',
    footerLinkWuwa: '🌊 Wuthering Waves',
    footerLinkNte: '🔮 Neverness to Everness',
    footerLinkAccount: '🔑 Accounts Store & Starters',
    footerLinkReviews: '⭐ Reviews & Testimonials',
    footerLinkTrack: '📦 Track My Order Status',
    footerLinkGuide: '📖 How to Order Guide',
    footerLinkTerms: '⚖️ Terms of Service',
    footerLinkPrivacy: '🔒 Privacy Policy & Warranty',
    footerLinkCs: '💬 Contact Support on WhatsApp',
    footerLinkReport: '🚩 Report an Issue',
    footerPayMethodsTitle: 'Supported Payment Methods:',
    footerSocialTitle: 'Official Communities:',
    footerDisclaimer: 'NORXSTORE is an independent marketplace & gaming service provider. All game titles, trademarks, and artwork are properties of their respective owners (HoYoverse, Kuro Games, Hotta Studio).',
    footerRights: 'All Rights Reserved.',
    infoGuideTitle: '📖 How to Order Guide',
    infoTermsTitle: '⚖️ Terms of Service',
    infoPrivacyTitle: '🔒 Privacy Policy & Warranty',
    infoReportTitle: '🚩 Report an Issue',
    btnOrderNow: '🛒 Order Now',
    orderNotifClose: '✕ Close Window',
    orderNotifHistory: '🛒 View Order History'
  }
};

function t(key, params = {}){
  const lang = (typeof currentSelectedCountry !== 'undefined' && currentSelectedCountry) ? currentSelectedCountry : 'ID';
  const dict = I18N[lang] || I18N.ID;
  let str = dict[key] !== undefined ? dict[key] : (I18N.ID[key] !== undefined ? I18N.ID[key] : '');
  if(params && typeof params === 'object'){
    Object.keys(params).forEach(p => {
      str = str.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
    });
  }
  return str;
}


const DESC_EXACT_MAP = {
  "Harga murah cocok untuk pertama kali": {
    MY: "Harga berpatutan sesuai untuk kali pertama",
    SG: "Affordable price, perfect for first time"
  },
  "harga murah cocok untuk pertama kali": {
    MY: "harga berpatutan sesuai untuk kali pertama",
    SG: "affordable price, perfect for first time"
  },
  "Top-up via UID": {
    MY: "Tambah nilai melalui UID",
    SG: "Top-up via UID"
  },
  "30 hari": {
    MY: "30 hari",
    SG: "30 days"
  },
  "Full star F12": {
    MY: "Bintang penuh F12",
    SG: "Full stars F12"
  },
  "Memory of Chaos": {
    MY: "Memory of Chaos",
    SG: "Memory of Chaos"
  },
  "Pure Fiction": {
    MY: "Pure Fiction",
    SG: "Pure Fiction"
  },
  "Tower of Adversity": {
    MY: "Tower of Adversity",
    SG: "Tower of Adversity"
  },
  "All weekly bosses": {
    MY: "Semua bos mingguan",
    SG: "All weekly bosses"
  },
  "Story progression": {
    MY: "Kemajuan jalan cerita",
    SG: "Story progression"
  },
  "Anomaly farming": {
    MY: "Farming anomali & sumber",
    SG: "Anomaly & resource farming"
  },
  "Primogem, Welkin, Spiral Abyss full star.": {
    MY: "Primogem, Welkin, Spiral Abyss bintang penuh.",
    SG: "Primogem, Welkin, Spiral Abyss full stars."
  },
  "Memory of Chaos & Pure Fiction full star.": {
    MY: "Memory of Chaos & Pure Fiction bintang penuh.",
    SG: "Memory of Chaos & Pure Fiction full stars."
  },
  "Tower of Adversity clear & weekly boss.": {
    MY: "Tower of Adversity selesai & bos mingguan.",
    SG: "Tower of Adversity clear & weekly boss."
  },
  "Story clear, anomaly farming, & resource.": {
    MY: "Cerita selesai, farming anomali & sumber.",
    SG: "Story clear, anomaly farming & resources."
  },
  "Harga murah cocok untuk semua": {
    MY: "Harga berpatutan sesuai untuk semua pemain",
    SG: "Affordable price, suitable for everyone"
  },
  "Harga murah cocok untuk yang baru dapat uang": {
    MY: "Harga mampu milik sesuai untuk yang baru dapat gaji",
    SG: "Budget-friendly price, perfect treat after payday"
  },
  "Harga cocok untuk yang baru gajian": {
    MY: "Pakej berbaloi sesuai waktu baru dapat gaji",
    SG: "Great value package for payday top-up"
  },
  "Eksploration all map mondstadt": {
    MY: "100% Eksplorasi seluruh peta Mondstadt",
    SG: "100% Exploration across Mondstadt map"
  },
  "Eksploration all map liyue": {
    MY: "100% Eksplorasi seluruh peta Liyue",
    SG: "100% Exploration across Liyue map"
  },
  "Eksploration all map inazuma": {
    MY: "100% Eksplorasi seluruh peta Inazuma",
    SG: "100% Exploration across Inazuma map"
  },
  "Eksploration all map fontaine": {
    MY: "100% Eksplorasi seluruh peta Fontaine",
    SG: "100% Exploration across Fontaine map"
  },
  "Eksploration all map sumeru": {
    MY: "100% Eksplorasi seluruh peta Sumeru",
    SG: "100% Exploration across Sumeru map"
  },
  "Eksploration all map natlan": {
    MY: "100% Eksplorasi seluruh peta Natlan",
    SG: "100% Exploration across Natlan map"
  },
  "Eksploration all map nodkrai": {
    MY: "100% Eksplorasi seluruh peta Nodkrai",
    SG: "100% Exploration across Nodkrai map"
  },
  "Eksploration all map snezhnaya": {
    MY: "100% Eksplorasi seluruh peta Snezhnaya",
    SG: "100% Exploration across Snezhnaya map"
  },
  "Eksploration all map lahai roy": {
    MY: "100% Eksplorasi seluruh peta Lahai Roi",
    SG: "100% Exploration across Lahai Roi map"
  },
  "Eksploration all map rinascita": {
    MY: "100% Eksplorasi seluruh peta Rinascita",
    SG: "100% Exploration across Rinascita map"
  },
  "Eksploration all map huanglong": {
    MY: "100% Eksplorasi seluruh peta Huanglong",
    SG: "100% Exploration across Huanglong map"
  },
  "Eksploration all map mengzhou": {
    MY: "100% Eksplorasi seluruh peta Mengzhou",
    SG: "100% Exploration across Mengzhou map"
  },
  "All quest archon mondstadt": {
    MY: "Selesai semua quest Archon Mondstadt",
    SG: "Complete all Mondstadt Archon Quests"
  },
  "All quest archon liyue": {
    MY: "Selesai semua quest Archon Liyue",
    SG: "Complete all Liyue Archon Quests"
  },
  "All quest archon inazuma": {
    MY: "Selesai semua quest Archon Inazuma",
    SG: "Complete all Inazuma Archon Quests"
  },
  "All quest archon sumeru": {
    MY: "Selesai semua quest Archon Sumeru",
    SG: "Complete all Sumeru Archon Quests"
  },
  "All quest archon fontaine": {
    MY: "Selesai semua quest Archon Fontaine",
    SG: "Complete all Fontaine Archon Quests"
  },
  "All quest archon natlan": {
    MY: "Selesai semua quest Archon Natlan",
    SG: "Complete all Natlan Archon Quests"
  },
  "All quest archon nodkrai": {
    MY: "Selesai semua quest Archon Nodkrai",
    SG: "Complete all Nodkrai Archon Quests"
  },
  "All quest archon snezhnaya": {
    MY: "Selesai semua quest Archon Snezhnaya",
    SG: "Complete all Snezhnaya Archon Quests"
  },
  "Hangout/chap": {
    MY: "Hangout event setiap bab",
    SG: "Hangout event per chapter"
  },
  "All aranara clear": {
    MY: "Selesai semua quest hutan Aranara 100%",
    SG: "Complete all Aranara forest quests 100%"
  },
  "Story quest/chap": {
    MY: "Story quest setiap bab",
    SG: "Story quest per chapter"
  },
  "World quest/chapter": {
    MY: "World quest setiap bab",
    SG: "World quest per chapter"
  },
  "All quest clear yang tersedia tidak termasuk quest archon": {
    MY: "Selesai semua quest yang tersedia (tidak termasuk quest Archon)",
    SG: "Clear all available world quests (excluding Archon quests)"
  },
  "Daily bp, Daily comission, Resin, Ekspedisi": {
    MY: "Daily BP, Misi Harian, Resin, Ekspedisi",
    SG: "Daily BP, Commissions, Resin burning, Expeditions"
  },
  "Daily bp, Daily comission, Resin, Ekspedisi, Reputasi": {
    MY: "Daily BP, Misi Harian, Resin, Ekspedisi, Reputasi",
    SG: "Daily BP, Commissions, Resin, Expeditions, Reputation"
  },
  "Daily bp, Daily comission, Resin, Ekspedisi, Reputasi, Weekly boss, Event": {
    MY: "Daily BP, Misi Harian, Resin, Ekspedisi, Reputasi, Weekly Boss, Event Semasa",
    SG: "Daily BP, Commissions, Resin, Expeditions, Reputation, Weekly Bosses, Active Events"
  },
  "Up level karakter 1-40": {
    MY: "Naikkan tahap karakter 1-40",
    SG: "Level up character 1-40"
  },
  "Up level karakter 40-50": {
    MY: "Naikkan tahap karakter 40-50",
    SG: "Level up character 40-50"
  },
  "Up level karakter 50-60": {
    MY: "Naikkan tahap karakter 50-60",
    SG: "Level up character 50-60"
  },
  "Up level karakter 60-70": {
    MY: "Naikkan tahap karakter 60-70",
    SG: "Level up character 60-70"
  },
  "Up level karakter 70-80": {
    MY: "Naikkan tahap karakter 70-80",
    SG: "Level up character 70-80"
  },
  "Up level karakter 80-90": {
    MY: "Naikkan tahap karakter 80-90",
    SG: "Level up character 80-90"
  },
  "Joki culus persatunya": {
    MY: "Kutipan Oculus setiap satu",
    SG: "Collect Oculus per piece"
  },
  "Kumpulkan item dari monster persatunya": {
    MY: "Kumpul bahan daripada raksasa setiap satu",
    SG: "Farming monster drop materials per piece"
  },
  "Kumpulkan material dari monster persatunya": {
    MY: "Kumpul bahan material setiap satu",
    SG: "Farming materials & items per piece"
  },
  "All event harga sesuai kerumitan event": {
    MY: "Selesai event penuh, harga mengikut kerumitan event",
    SG: "Limited event clear, price depends on event complexity"
  },
  "Akun admin yang nganggur": {
    MY: "Akaun admin sedia ada, rekod selamat & bersih",
    SG: "Verified idle admin account, safe & clean record"
  },
  "Harga cocok untuk semua": {
    MY: "Harga berpatutan sesuai untuk semua pemain",
    SG: "Affordable price, suitable for everyone"
  },
  "All story quest": {
    MY: "Semua quest jalan cerita utama selesai",
    SG: "All main story quests clear"
  },
  "All eksploration quest": {
    MY: "Semua quest eksplorasi peta selesai",
    SG: "All exploration quests clear"
  },
  "All companion quest": {
    MY: "Semua quest rakan pengembara selesai",
    SG: "All companion story quests clear"
  },
  "Genshin Impact — Joki & Top-Up": {
    MY: "Genshin Impact — Servis Joki & Tambah Nilai",
    SG: "Genshin Impact — Pilot Boost & Top-Up"
  },
  "Honkai: Star Rail — Joki MoC & PF": {
    MY: "Honkai: Star Rail — Joki MoC & Pure Fiction",
    SG: "Honkai: Star Rail — MoC & Pure Fiction"
  },
  "Wuthering Waves — Joki Tower & Boss": {
    MY: "Wuthering Waves — Joki Tower & Bos Mingguan",
    SG: "Wuthering Waves — Tower of Adversity & Boss Boost"
  },
  "Neverness to Everness — Joki Progress": {
    MY: "Neverness to Everness — Joki Kemajuan Cerita",
    SG: "Neverness to Everness — Story & Progression Boost"
  }
};

const WORD_MAP_MY = [
  // Multi-word level & ascension patterns
  [/\bup level karakter (\d+)\s*[-–]\s*(\d+)\b/gi, 'Tingkatkan tahap karakter $1-$2'],
  [/\bup level karakter\b/gi, 'Tingkatkan tahap karakter'],
  [/\bup level (\d+)\s*[-–]\s*(\d+)\b/gi, 'Tingkatkan level $1-$2'],
  [/\bup level\b/gi, 'Tingkatkan tahap'],
  [/\bup lvl (\d+)\s*[-–]\s*(\d+)\b/gi, 'Tingkatkan level $1-$2'],
  [/\bup lvl\b/gi, 'Tingkatkan level'],
  [/\bnaik level\b/gi, 'Tingkatkan level'],
  [/\bnaikkan level\b/gi, 'Tingkatkan level'],
  [/\bkarakter\b/gi, 'karakter'],
  [/\bchar\b/gi, 'karakter'],

  // Account admin / status patterns
  [/\baccount admin yang nganggur\b/gi, 'Akaun admin yang tidak digunakan'],
  [/\bakun admin yang nganggur\b/gi, 'Akaun admin yang tidak digunakan'],
  [/\byang nganggur\b/gi, 'yang tidak digunakan'],
  [/\bnganggur\b/gi, 'tidak digunakan'],
  [/\bterbiar\b/gi, 'terbiar'],
  [/\baccount admin\b/gi, 'akaun admin'],
  [/\bakun admin\b/gi, 'akaun admin'],
  [/\bakun pribadi\b/gi, 'akaun peribadi'],
  [/\baccount pribadi\b/gi, 'akaun peribadi'],
  [/\bakun sultan\b/gi, 'akaun sultan'],
  [/\bakun terawat\b/gi, 'akaun dijaga rapi'],
  [/\bakun pensiun\b/gi, 'akaun bersara'],
  [/\bakun pensi\b/gi, 'akaun pencen'],
  [/\bpensiun\b/gi, 'bersara'],
  [/\bpensi\b/gi, 'pencen'],
  [/\bsangat terawat\b/gi, 'sangat dijaga rapi'],
  [/\bterawat\b/gi, 'dijaga rapi'],
  [/\bbisa ganti email\b/gi, 'boleh tukar emel'],
  [/\bganti email\b/gi, 'tukar emel'],
  [/\bganti password\b/gi, 'tukar kata laluan'],
  [/\bubah password\b/gi, 'tukar kata laluan'],
  [/\btanpa minus\b/gi, 'bersih tiada tolak'],
  [/\bno minus\b/gi, 'bersih tiada tolak'],
  [/\brawat account\b/gi, 'Rawat akaun'],
  [/\brawat akun\b/gi, 'Rawat akaun'],
  [/\beksploration\b/gi, 'Eksplorasi'],
  [/\beksplorasi\b/gi, 'Eksplorasi'],

  // Durations & Time
  [/\b(\d+)\s*hari\b/gi, '$1 hari'],
  [/\bhari\b/gi, 'hari'],
  [/\b(\d+)\s*jam\b/gi, '$1 jam'],
  [/\bjam\b/gi, 'jam'],
  [/\b(\d+)\s*menit\b/gi, '$1 minit'],
  [/\bmenit\b/gi, 'minit'],
  [/\bmingguan\b/gi, 'mingguan'],
  [/\bbulanan\b/gi, 'bulanan'],
  [/\bharian\b/gi, 'harian'],

  // Selling & General
  [/\bharga murah cocok untuk pertama kali\b/gi, 'harga berpatutan sesuai untuk kali pertama'],
  [/\bharga cocok untuk semua\b/gi, 'harga berpatutan sesuai untuk semua'],
  [/\bharga murah\b/gi, 'harga berpatutan'],
  [/\bharga cocok\b/gi, 'harga berpatutan'],
  [/\bharga\b/gi, 'harga'],
  [/\bpersatunya\b/gi, 'setiap satu'],
  [/\bpersatu\b/gi, 'setiap satu'],
  [/\ball story quest\b/gi, 'semua quest jalan cerita selesai'],
  [/\ball eksploration quest\b/gi, 'semua quest eksplorasi selesai'],
  [/\ball companion quest\b/gi, 'semua quest rakan selesai'],
  [/\bcocok untuk pertama kali\b/gi, 'sesuai untuk kali pertama'],
  [/\bpertama kali\b/gi, 'kali pertama'],
  [/\bcocok untuk\b/gi, 'sesuai untuk'],
  [/\bcocok\b/gi, 'sesuai'],
  [/\bmurah\b/gi, 'berpatutan'],
  [/\bakun polosan\b/gi, 'akaun kosong'],
  [/\bakun starter\b/gi, 'akaun permulaan'],
  [/\bakun reroll\b/gi, 'akaun reroll'],
  [/\bjual akun\b/gi, 'Jual akaun'],
  [/\bjual beli akun\b/gi, 'Jual beli akaun'],
  [/\bakun\b/gi, 'akaun'],
  [/\baccount\b/gi, 'akaun'],
  [/\bproses cepat dan aman\b/gi, 'proses pantas dan selamat'],
  [/\bproses cepat\b/gi, 'proses pantas'],
  [/\bcepat\b/gi, 'pantas'],
  [/\baman\b/gi, 'selamat'],
  [/\bterpercaya\b/gi, 'dipercayai'],
  [/\bgaransi seumur hidup\b/gi, 'jaminan seumur hidup'],
  [/\bgaransi uang kembali\b/gi, 'jaminan wang dikembalikan'],
  [/\bgaransi anti hackback\b/gi, 'jaminan anti-hackback'],
  [/\bgaransi\b/gi, 'jaminan'],
  [/\bbergaransi\b/gi, 'berjaminan'],
  [/\bsiap pakai\b/gi, 'sedia digunakan'],
  [/\bsiap main\b/gi, 'sedia untuk dimainkan'],
  [/\bpaket hemat\b/gi, 'pakej jimat'],
  [/\bpaket\b/gi, 'pakej'],
  [/\blayanan\b/gi, 'perkhidmatan'],
  [/\bselesai dalam\b/gi, 'siap dalam'],
  [/\bselesai\b/gi, 'siap'],
  [/\bdikerjakan\b/gi, 'dijalankan'],
  [/\bbisa nego\b/gi, 'boleh runding'],
  [/\bbisa request\b/gi, 'boleh buat permintaan'],
  [/\bbebas request\b/gi, 'bebas buat permintaan'],
  [/\bbisa\b/gi, 'boleh'],
  [/\bbutuh\b/gi, 'perlu'],
  [/\byang\b/gi, 'yang'],
  [/\bdan\b/gi, 'dan'],
  [/\batau\b/gi, 'atau'],
  [/\buntuk\b/gi, 'untuk'],
  [/\bbuat\b/gi, 'untuk'],
  [/\bdari\b/gi, 'dari'],
  [/\bsampai\b/gi, 'hingga'],
  [/\bhingga\b/gi, 'hingga'],
  [/\bdengan\b/gi, 'dengan'],
  [/\btanpa\b/gi, 'tanpa'],
  [/\bhanya\b/gi, 'hanya'],
  [/\bcuma\b/gi, 'hanya'],
  [/\bsudah\b/gi, 'sudah'],
  [/\budah\b/gi, 'sudah'],
  [/\btidak\b/gi, 'tidak'],
  [/\bgak\b/gi, 'tidak'],
  [/\bnggak\b/gi, 'tidak'],
  [/\bsemua\b/gi, 'semua']
];

const WORD_MAP_SG = [
  // Multi-word level & ascension patterns
  [/\bup level karakter (\d+)\s*[-–]\s*(\d+)\b/gi, 'Level up character $1-$2'],
  [/\bup level karakter\b/gi, 'Level up character'],
  [/\bup level (\d+)\s*[-–]\s*(\d+)\b/gi, 'Level up $1-$2'],
  [/\bup level\b/gi, 'Level up'],
  [/\bup lvl (\d+)\s*[-–]\s*(\d+)\b/gi, 'Level up $1-$2'],
  [/\bup lvl\b/gi, 'Level up'],
  [/\bnaik level\b/gi, 'Level up'],
  [/\bnaikkan level\b/gi, 'Level up'],
  [/\bkarakter\b/gi, 'character'],
  [/\bchar\b/gi, 'character'],

  // Account admin / status patterns
  [/\baccount admin yang nganggur\b/gi, 'Unused admin account'],
  [/\bakun admin yang nganggur\b/gi, 'Unused admin account'],
  [/\byang nganggur\b/gi, 'unused / idle'],
  [/\bnganggur\b/gi, 'unused / idle'],
  [/\bterbiar\b/gi, 'unused'],
  [/\baccount admin\b/gi, 'admin account'],
  [/\bakun admin\b/gi, 'admin account'],
  [/\bakun pribadi\b/gi, 'personal account'],
  [/\baccount pribadi\b/gi, 'personal account'],
  [/\bakun sultan\b/gi, 'whale / luxury account'],
  [/\bakun terawat\b/gi, 'well-maintained account'],
  [/\bakun pensiun\b/gi, 'retired player account'],
  [/\bakun pensi\b/gi, 'retired player account'],
  [/\bpensiun\b/gi, 'retired'],
  [/\bpensi\b/gi, 'retired player'],
  [/\bsangat terawat\b/gi, 'very well-maintained'],
  [/\bterawat\b/gi, 'well-maintained'],
  [/\bbisa ganti email\b/gi, 'email changeable'],
  [/\bganti email\b/gi, 'change email'],
  [/\bganti password\b/gi, 'change password'],
  [/\bubah password\b/gi, 'change password'],
  [/\btanpa minus\b/gi, 'no minus / clean record'],
  [/\bno minus\b/gi, 'no minus / clean record'],
  [/\brawat account\b/gi, 'Account maintenance'],
  [/\brawat akun\b/gi, 'Account maintenance'],
  [/\beksploration\b/gi, 'Exploration'],
  [/\beksplorasi\b/gi, 'Exploration'],

  // Durations & Time
  [/\b(\d+)\s*hari\b/gi, '$1 days'],
  [/\bhari\b/gi, 'days'],
  [/\b(\d+)\s*jam\b/gi, '$1 hours'],
  [/\bjam\b/gi, 'hours'],
  [/\b(\d+)\s*menit\b/gi, '$1 minutes'],
  [/\bmenit\b/gi, 'minutes'],
  [/\bmingguan\b/gi, 'weekly'],
  [/\bbulanan\b/gi, 'monthly'],
  [/\bharian\b/gi, 'daily'],

  // Selling & General
  [/\bharga murah cocok untuk pertama kali\b/gi, 'Affordable price, perfect for first time'],
  [/\bharga murah cocok untuk semua\b/gi, 'Affordable price, suitable for everyone'],
  [/\bharga cocok untuk semua\b/gi, 'Affordable price, suitable for everyone'],
  [/\bharga murah cocok untuk yang baru dapat uang\b/gi, 'Budget-friendly price, perfect treat after payday'],
  [/\bharga cocok untuk yang baru gajian\b/gi, 'Great value package for payday top-up'],
  [/\bharga murah\b/gi, 'affordable price'],
  [/\bharga cocok\b/gi, 'affordable price'],
  [/\bharga berpatutan\b/gi, 'affordable price'],
  [/\bharga\b/gi, 'price'],
  [/\bpersatunya\b/gi, 'per piece'],
  [/\bpersatu\b/gi, 'per piece'],
  [/\bkumpulkan item dari monster persatunya\b/gi, 'Farming monster drop materials per piece'],
  [/\bkumpulkan material dari monster persatunya\b/gi, 'Farming materials & items per piece'],
  [/\bkumpulkan\b/gi, 'collect / farm'],
  [/\bjoki culus persatunya\b/gi, 'Collect Oculus per piece'],
  [/\bjoki culus\b/gi, 'Oculus collection service'],
  [/\bjoki\b/gi, 'boosting / service'],
  [/\bjokian\b/gi, 'order / service'],
  [/\ball event harga sesuai kerumitan event\b/gi, 'Limited event clear, price depends on event complexity'],
  [/\bkerumitan\b/gi, 'complexity'],
  [/\bsesuai\b/gi, 'depends on'],
  [/\btidak termasuk\b/gi, 'excluding'],
  [/\btermasuk\b/gi, 'including'],
  [/\byang tersedia\b/gi, 'available'],
  [/\btersedia\b/gi, 'available'],
  [/\ball quest clear yang tersedia tidak termasuk quest archon\b/gi, 'Clear all available world quests (excluding Archon quests)'],
  [/\ball eksploration quest\b/gi, 'All exploration quests clear'],
  [/\ball companion quest\b/gi, 'All companion story quests clear'],
  [/\ball story quest\b/gi, 'All main story quests clear'],
  [/\bcocok untuk pertama kali\b/gi, 'perfect for first time'],
  [/\bpertama kali\b/gi, 'first time'],
  [/\bcocok untuk\b/gi, 'suitable for'],
  [/\bcocok\b/gi, 'suitable'],
  [/\bmurah\b/gi, 'affordable'],
  [/\bakun polosan\b/gi, 'fresh / clean account'],
  [/\bakun starter\b/gi, 'starter account'],
  [/\bakun reroll\b/gi, 'reroll account'],
  [/\bjual akun\b/gi, 'Account for sale'],
  [/\bjual beli akun\b/gi, 'Buy & sell accounts'],
  [/\bakun\b/gi, 'account'],
  [/\baccount\b/gi, 'account'],
  [/\bproses cepat dan aman\b/gi, 'fast and secure process'],
  [/\bproses cepat\b/gi, 'fast process'],
  [/\bcepat\b/gi, 'fast'],
  [/\baman\b/gi, 'safe & secure'],
  [/\bterpercaya\b/gi, 'trusted'],
  [/\bgaransi seumur hidup\b/gi, 'lifetime warranty'],
  [/\bgaransi uang kembali\b/gi, 'money-back guarantee'],
  [/\bgaransi anti hackback\b/gi, 'anti-hackback warranty'],
  [/\bgaransi\b/gi, 'warranty'],
  [/\bbergaransi\b/gi, 'guaranteed'],
  [/\bsiap pakai\b/gi, 'ready to play'],
  [/\bsiap main\b/gi, 'ready to play'],
  [/\bpaket hemat\b/gi, 'value pack'],
  [/\bpaket\b/gi, 'pack'],
  [/\blayanan\b/gi, 'service'],
  [/\bselesai dalam\b/gi, 'completed in'],
  [/\bselesai\b/gi, 'completed'],
  [/\bdikerjakan\b/gi, 'handled'],
  [/\bbisa nego\b/gi, 'negotiable'],
  [/\bbisa request\b/gi, 'custom request available'],
  [/\bbebas request\b/gi, 'free to request'],
  [/\bbisa\b/gi, 'can'],
  [/\bmisi\b/gi, 'missions'],
  [/\btugas\b/gi, 'tasks'],
  [/\byang\b/gi, 'which is'],
  [/\bdan\b/gi, 'and'],
  [/\batau\b/gi, 'or'],
  [/\buntuk\b/gi, 'for'],
  [/\bbuat\b/gi, 'for'],
  [/\bdari\b/gi, 'from'],
  [/\bsampai\b/gi, 'to'],
  [/\bhingga\b/gi, 'up to'],
  [/\bdengan\b/gi, 'with'],
  [/\btanpa\b/gi, 'without'],
  [/\bhanya\b/gi, 'only'],
  [/\bcuma\b/gi, 'only'],
  [/\bsudah\b/gi, 'already'],
  [/\budah\b/gi, 'already'],
  [/\btidak\b/gi, 'not'],
  [/\bgak\b/gi, 'not'],
  [/\bnggak\b/gi, 'not'],
  [/\bsemua\b/gi, 'all']
];

function translateProductDesc(desc, lang){
  if(!desc || typeof desc !== 'string') return '';
  const trimmed = desc.trim();
  if(!trimmed) return '';
  
  const targetLang = (lang || currentSelectedCountry || 'ID').toUpperCase();
  if(targetLang === 'ID') return desc;

  // 1. Direct exact phrase match
  if(DESC_EXACT_MAP[trimmed] && DESC_EXACT_MAP[trimmed][targetLang]){
    return DESC_EXACT_MAP[trimmed][targetLang];
  }
  // Case-insensitive exact match
  const lower = trimmed.toLowerCase();
  for(const k in DESC_EXACT_MAP){
    if(k.toLowerCase() === lower && DESC_EXACT_MAP[k][targetLang]){
      return DESC_EXACT_MAP[k][targetLang];
    }
  }

  // 2. Token-based Pattern and word mapping
  let s = desc;
  const wordMap = (targetLang === 'MY') ? WORD_MAP_MY : (targetLang === 'SG' ? WORD_MAP_SG : []);
  const tokenMap = [];
  wordMap.forEach(([regex, rep], idx) => {
    s = s.replace(regex, (match, ...args) => {
      const token = `__DESC_TOK_${idx}_${tokenMap.length}__`;
      let replaced = rep;
      if(rep.includes('$1') && args[0] !== undefined){
        replaced = rep.replace(/\$1/g, args[0]).replace(/\$2/g, args[1] || '').replace(/\$3/g, args[2] || '');
      } else if(match && match[0] === match[0].toUpperCase()){
        replaced = replaced.charAt(0).toUpperCase() + replaced.slice(1);
      }
      tokenMap.push({ token, replaced });
      return token;
    });
  });

  tokenMap.forEach(({ token, replaced }) => {
    s = s.replace(token, replaced);
  });

  return s;
}

function getProductDesc(p, lang = null){
  if(!p) return '';
  const currentLang = (lang || currentSelectedCountry || 'ID').toUpperCase();
  if(currentLang === 'MY' && p.desc_my) return p.desc_my;
  if(currentLang === 'SG' && (p.desc_sg || p.desc_en)) return p.desc_sg || p.desc_en;
  if(currentLang === 'ID' && p.desc_id) return p.desc_id;
  const baseDesc = p.desc || '';
  return translateProductDesc(baseDesc, currentLang);
}


const NAME_EXACT_MAP = {
  // Genshin IF
  "10 IF": { MY: "10 Intertwined Fate", SG: "10 Intertwined Fate" },
  "20 IF": { MY: "20 Intertwined Fate", SG: "20 Intertwined Fate" },
  "30 IF": { MY: "30 Intertwined Fate", SG: "30 Intertwined Fate" },
  "40 IF": { MY: "40 Intertwined Fate", SG: "40 Intertwined Fate" },
  "50 IF": { MY: "50 Intertwined Fate", SG: "50 Intertwined Fate" },
  "60 IF": { MY: "60 Intertwined Fate", SG: "60 Intertwined Fate" },
  "100 IF": { MY: "100 Intertwined Fate", SG: "100 Intertwined Fate" },
  "200 IF": { MY: "200 Intertwined Fate", SG: "200 Intertwined Fate" },

  // WuWa RT
  "10 RT": { MY: "10 Radiant Tide", SG: "10 Radiant Tide" },
  "20 RT": { MY: "20 Radiant Tide", SG: "20 Radiant Tide" },
  "30 RT": { MY: "30 Radiant Tide", SG: "30 Radiant Tide" },
  "40 RT": { MY: "40 Radiant Tide", SG: "40 Radiant Tide" },
  "50 RT": { MY: "50 Radiant Tide", SG: "50 Radiant Tide" },
  "60 RT": { MY: "60 Radiant Tide", SG: "60 Radiant Tide" },
  "100 RT": { MY: "100 Radiant Tide", SG: "100 Radiant Tide" },
  "200 RT": { MY: "200 Radiant Tide", SG: "200 Radiant Tide" },

  // Genshin Exploration
  "EKSPLORE MONDSTADT": { MY: "Eksplorasi Mondstadt 100%", SG: "Mondstadt 100% Exploration" },
  "EKSPLORE LIYUE": { MY: "Eksplorasi Liyue 100%", SG: "Liyue 100% Exploration" },
  "EKSPLORE INAZUMA": { MY: "Eksplorasi Inazuma 100%", SG: "Inazuma 100% Exploration" },
  "EKSPLORE FONTAINE": { MY: "Eksplorasi Fontaine 100%", SG: "Fontaine 100% Exploration" },
  "EKSPLORE SUMERU": { MY: "Eksplorasi Sumeru 100%", SG: "Sumeru 100% Exploration" },
  "EKSPLORE NATLAN": { MY: "Eksplorasi Natlan 100%", SG: "Natlan 100% Exploration" },
  "EKSPLORE NODKRAI": { MY: "Eksplorasi Nodkrai 100%", SG: "Nodkrai 100% Exploration" },
  "EKSPLORE SNEZHNAYA": { MY: "Eksplorasi Snezhnaya 100%", SG: "Snezhnaya 100% Exploration" },

  // WuWa Exploration
  "EKSPLORE LAHAI ROI": { MY: "Eksplorasi Lahai Roi 100%", SG: "Lahai Roi 100% Exploration" },
  "EKSPLORE RINASCITA": { MY: "Eksplorasi Rinascita 100%", SG: "Rinascita 100% Exploration" },
  "EKSPLORE HUANGLONG": { MY: "Eksplorasi Huanglong 100%", SG: "Huanglong 100% Exploration" },
  "EKSPLORE MENGZHOU": { MY: "Eksplorasi Mengzhou 100%", SG: "Mengzhou 100% Exploration" },

  // Quests & Story
  "ARCHON MONDSTADT": { MY: "Quest Archon Mondstadt", SG: "Mondstadt Archon Quest" },
  "ARCHON LIYUE": { MY: "Quest Archon Liyue", SG: "Liyue Archon Quest" },
  "ARCHON INAZUMA": { MY: "Quest Archon Inazuma", SG: "Inazuma Archon Quest" },
  "ARCHON SUMERU": { MY: "Quest Archon Sumeru", SG: "Sumeru Archon Quest" },
  "ARCHON FONTAINE": { MY: "Quest Archon Fontaine", SG: "Fontaine Archon Quest" },
  "ARCHON NATLAN": { MY: "Quest Archon Natlan", SG: "Natlan Archon Quest" },
  "ARCHON NODKRAI": { MY: "Quest Archon Nodkrai", SG: "Nodkrai Archon Quest" },
  "ARCHON SNEZHNAYA": { MY: "Quest Archon Snezhnaya", SG: "Snezhnaya Archon Quest" },
  "HANGOUT/chapter": { MY: "Hangout Event (Setiap Bab)", SG: "Hangout Event (Per Chapter)" },
  "ARANARA": { MY: "Semua Quest Aranara Selesai", SG: "Aranara All Quests Clear" },
  "STORY QUEST/chapter": { MY: "Story Quest (Setiap Bab)", SG: "Story Quest (Per Chapter)" },
  "WORLD QUEST/chapter": { MY: "World Quest (Setiap Bab)", SG: "World Quest (Per Chapter)" },
  "ALL QUEST": { MY: "Semua Quest Dunia Selesai", SG: "All World Quests Clear" },

  // Rawat Account / Maintenance
  "DAILY": { MY: "Rawat Akaun Harian (Misi + Resin)", SG: "Daily Maintenance (Commissions + Resin)" },
  "WEEKLY": { MY: "Rawat Akaun Mingguan (Harian + Boss)", SG: "Weekly Maintenance (Daily + Bosses)" },
  "MONTHLY": { MY: "Rawat Akaun Bulanan Pakej Penuh", SG: "Monthly Maintenance Full Pack" },

  // Levels
  "LVL 1 - 40": { MY: "Naik Level Karakter 1 - 40", SG: "Level Up Character 1 - 40" },
  "LVL 40 - 50": { MY: "Naik Level Karakter 40 - 50", SG: "Level Up Character 40 - 50" },
  "LVL 50 - 60": { MY: "Naik Level Karakter 50 - 60", SG: "Level Up Character 50 - 60" },
  "LVL 60 - 70": { MY: "Naik Level Karakter 60 - 70", SG: "Level Up Character 60 - 70" },
  "LVL 70 - 80": { MY: "Naik Level Karakter 70 - 80", SG: "Level Up Character 70 - 80" },
  "LVL 80 - 90": { MY: "Naik Level Karakter 80 - 90", SG: "Level Up Character 80 - 90" },

  // Farming & Misc
  "CULUS/PCS": { MY: "Kutipan Oculus / Biji", SG: "Oculus Collection / Pcs" },
  "MONSTER DROP/PCS": { MY: "Bahan Raksasa / Biji", SG: "Monster Drops Farming / Pcs" },
  "MATERIAL": { MY: "Kumpul Bahan Material / Pcs", SG: "Material Farming / Pcs" },
  "EVENT": { MY: "Servis Selesai Event", SG: "Event Completion Service" },
  "Genshin account": { MY: "Akaun Sah Genshin Impact", SG: "Genshin Impact Verified Account" },
  "Genshin Account": { MY: "Akaun Sah Genshin Impact", SG: "Genshin Impact Verified Account" },

  // WuWa The Black Shores & Extra Quests
  "EKSPLORE BLACK SHORES": { MY: "Eksplorasi The Black Shores 100%", SG: "The Black Shores 100% Exploration" },
  "STORY QUEST": { MY: "Quest Jalan Cerita Penuh", SG: "Main Story Quest Clear" },
  "EKSPLORATION QUEST": { MY: "Quest Eksplorasi Kawasan", SG: "Exploration Quest Clear" },
  "COMPANION QUEST": { MY: "Quest Rakan / Companion", SG: "Companion Story Quest Clear" },
  "SIDE QUEST": { MY: "Quest Sampingan", SG: "Side Quest Clear" },

  // NTE Stellar Dice
  "10 SD": { MY: "10 Stellar Dice", SG: "10 Stellar Dice" },
  "20 SD": { MY: "20 Stellar Dice", SG: "20 Stellar Dice" },
  "30 SD": { MY: "30 Stellar Dice", SG: "30 Stellar Dice" },
  "40 SD": { MY: "40 Stellar Dice", SG: "40 Stellar Dice" },
  "50 SD": { MY: "50 Stellar Dice", SG: "50 Stellar Dice" },
  "60 SD": { MY: "60 Stellar Dice", SG: "60 Stellar Dice" }
};

const NAME_WORD_MAP_MY = [
  [/\beksplore\s+all\s+map\b/gi, 'Eksplorasi Semua Peta 100%'],
  [/\beksplore\b/gi, 'Eksplorasi'],
  [/\brawat account\b/gi, 'Rawat Akaun'],
  [/\brawat akun\b/gi, 'Rawat Akaun'],
  [/\bjual beli akun\b/gi, 'Jual Beli Akaun'],
  [/\bjual akun\b/gi, 'Akaun Untuk Dijual'],
  [/\bakun starter\b/gi, 'Akaun Starter'],
  [/\bakun reroll\b/gi, 'Akaun Reroll'],
  [/\bakun polosan\b/gi, 'Akaun Kosong'],
  [/\bakun admin yang nganggur\b/gi, 'Akaun Admin Sedia Ada'],
  [/\bakun admin\b/gi, 'Akaun Admin'],
  [/\bakun pribadi\b/gi, 'Akaun Peribadi'],
  [/\bakun pensiun\b/gi, 'Akaun Pencen'],
  [/\bakun pensi\b/gi, 'Akaun Pencen'],
  [/\bpensiun\b/gi, 'Pencen'],
  [/\bpensi\b/gi, 'Pencen'],
  [/\bakun\b/gi, 'Akaun'],
  [/\baccount\b/gi, 'Akaun'],
  [/\blayanan\b/gi, 'Perkhidmatan'],
  [/\bpersatunya\b/gi, 'setiap satu'],
  [/\bpaket hemat\b/gi, 'Pakej Jimat'],
  [/\bpaket\b/gi, 'Pakej'],
  [/\bterawat\b/gi, 'Dijaga Rapi'],
  [/\bsiap pakai\b/gi, 'Sedia Digunakan'],
  [/\bsiap main\b/gi, 'Sedia Dimainkan'],
  [/\bgaransi\b/gi, 'Jaminan'],
  [/\bmurah\b/gi, 'Mampu Milik'],
  [/\bharian\b/gi, 'Harian'],
  [/\bmingguan\b/gi, 'Mingguan'],
  [/\bbulanan\b/gi, 'Bulanan'],
  [/\bselesai\b/gi, 'Siap']
];

const NAME_WORD_MAP_SG = [
  [/\beksplore\s+all\s+map\b/gi, '100% Map Exploration'],
  [/\beksplore\b/gi, 'Exploration'],
  [/\beksplorasi\b/gi, 'Exploration'],
  [/\brawat account\b/gi, 'Account Maintenance'],
  [/\brawat akun\b/gi, 'Account Maintenance'],
  [/\bjual beli akun\b/gi, 'Buy & Sell Accounts'],
  [/\bjual akun\b/gi, 'Account For Sale'],
  [/\bakun starter\b/gi, 'Starter Account'],
  [/\bakun reroll\b/gi, 'Reroll Account'],
  [/\bakun polosan\b/gi, 'Clean Account'],
  [/\bakun admin yang nganggur\b/gi, 'Idle Admin Account'],
  [/\bakun admin\b/gi, 'Admin Account'],
  [/\bakun pribadi\b/gi, 'Personal Account'],
  [/\bakun pensiun\b/gi, 'Retired Account'],
  [/\bakun pensi\b/gi, 'Retired Account'],
  [/\bpensiun\b/gi, 'Retired'],
  [/\bpensi\b/gi, 'Retired'],
  [/\bakun\b/gi, 'Account'],
  [/\baccount\b/gi, 'Account'],
  [/\blayanan\b/gi, 'Service'],
  [/\bjoki\b/gi, 'Boost / Service'],
  [/\bpersatunya\b/gi, 'per piece'],
  [/\bkarakter\b/gi, 'Character'],
  [/\bchar\b/gi, 'Character'],
  [/\bbintang\b/gi, 'Stars'],
  [/\bpaket hemat\b/gi, 'Value Pack'],
  [/\bpaket\b/gi, 'Package'],
  [/\bterawat\b/gi, 'Maintained'],
  [/\bsiap pakai\b/gi, 'Ready to Play'],
  [/\bsiap main\b/gi, 'Ready to Play'],
  [/\bgaransi\b/gi, 'Warranty'],
  [/\bmurah\b/gi, 'Budget'],
  [/\bharian\b/gi, 'Daily'],
  [/\bmingguan\b/gi, 'Weekly'],
  [/\bbulanan\b/gi, 'Monthly'],
  [/\bselesai\b/gi, 'Completed']
];

function translateProductName(name, lang){
  if(!name || typeof name !== 'string') return '';
  const trimmed = name.trim();
  if(!trimmed) return '';

  const targetLang = (lang || currentSelectedCountry || 'ID').toUpperCase();
  if(targetLang === 'ID') return name;

  if(NAME_EXACT_MAP[trimmed] && NAME_EXACT_MAP[trimmed][targetLang]){
    return NAME_EXACT_MAP[trimmed][targetLang];
  }
  const lower = trimmed.toLowerCase();
  for(const k in NAME_EXACT_MAP){
    if(k.toLowerCase() === lower && NAME_EXACT_MAP[k][targetLang]){
      return NAME_EXACT_MAP[k][targetLang];
    }
  }

  let s = name;
  const wordMap = (targetLang === 'MY') ? NAME_WORD_MAP_MY : (targetLang === 'SG' ? NAME_WORD_MAP_SG : []);
  wordMap.forEach(([regex, rep]) => {
    s = s.replace(regex, rep);
  });
  return s;
}

function getProductName(p, lang = null){
  if(!p) return '';
  const currentLang = (lang || currentSelectedCountry || 'ID').toUpperCase();
  if(typeof p === 'object' && p !== null){
    if(currentLang === 'MY' && p.name_my) return p.name_my;
    if(currentLang === 'SG' && (p.name_sg || p.name_en)) return p.name_sg || p.name_en;
    if(currentLang === 'ID' && p.name_id) return p.name_id;
  }
  const baseName = (typeof p === 'string') ? p : (p.name || '');
  return translateProductName(baseName, currentLang);
}


const CAT_INFO = {
  all: { name: 'Semua Layanan', shortName: '🛒 SEMUA', icon: '🛒' },
  genshin: { name: 'Genshin Impact', shortName: '✨ GENSHIN IMPACT', icon: '✨' },
  hsr: { name: 'Honkai: Star Rail', shortName: '🚀 HONKAI STAR RAIL', icon: '🚀' },
  wuwa: { name: 'Wuthering Waves', shortName: '🌊 WUTHERING WAVES', icon: '🌊' },
  nte: { name: 'Neverness to Everness', shortName: '🔮 NEVERNESS TO EVER', icon: '🔮' },
  lainnya: { name: 'Jual Beli Akun', shortName: '🔑 AKUN STORE', icon: '🔑' }
};

const PREDEFINED_SUBGROUPS_BY_CAT = {
  genshin: ['Eksplorasi', 'Quest & Misi', 'Rawat Akun', 'Spiral Abyss', 'Top-Up', 'Farming Material'],
  hsr: ['Memory of Chaos', 'Pure Fiction', 'Quest & Misi', 'Rawat Akun', 'Top-Up', 'Farming Material'],
  wuwa: ['Eksplorasi', 'Tower of Adversity', 'Quest & Misi', 'Rawat Akun', 'Top-Up', 'Farming Material'],
  nte: ['Quest & Misi', 'Farming Material', 'Rawat Akun', 'Top-Up'],
  lainnya: ['Akun Starter', 'Akun Mid-End', 'Akun Endgame']
};

let currentCatFilter = 'all';
let currentSubgroupFilter = 'all';

function getCategoryShortName(cat, lang = null){
  const l = (lang || currentSelectedCountry || 'ID').toUpperCase();
  if(!cat || cat === 'all') return t('catAll') || '🛒 SEMUA';
  if(cat === 'lainnya') return t('catAccount') || '🔑 AKUN STORE';
  const info = CAT_INFO[cat];
  return info ? info.shortName : String(cat).toUpperCase();
}

function getCategoryName(cat, lang = null){
  const l = (lang || currentSelectedCountry || 'ID').toUpperCase();
  if(!cat || cat === 'all'){
    return l === 'SG' ? 'All Services' : (l === 'MY' ? 'Semua Perkhidmatan' : 'Semua Layanan');
  }
  if(cat === 'lainnya'){
    return l === 'SG' ? 'Game Accounts Store' : (l === 'MY' ? 'Jual Beli Akaun' : 'Jual Beli Akun');
  }
  const info = CAT_INFO[cat];
  return info ? info.name : cat;
}

function getSubgroupIcon(sub){
  if(!sub) return '🏷️';
  const s = sub.toLowerCase();
  if(s.includes('top-up') || s.includes('topup') || s.includes('crystal') || s.includes('gem') || s.includes('primogem') || s.includes('oneiric') || s.includes('lunite')) return '💎';
  if(s.includes('pass') || s.includes('welkin') || s.includes('express') || s.includes('subscription')) return '🌙';
  if(s.includes('eksplor') || s.includes('explore') || s.includes('map') || s.includes('oculus') || s.includes('chest')) return '🗺️';
  if(s.includes('quest') || s.includes('misi') || s.includes('story')) return '📜';
  if(s.includes('rawat') || s.includes('daily') || s.includes('harian') || s.includes('resin') || s.includes('waveplate')) return '☕';
  if(s.includes('abyss') || s.includes('spiral')) return '⚔️';
  if(s.includes('moc') || s.includes('chaos')) return '🚀';
  if(s.includes('pure fiction')) return '🔥';
  if(s.includes('tower')) return '🌊';
  if(s.includes('boss') || s.includes('farming') || s.includes('material') || s.includes('calyx') || s.includes('echo')) return '👹';
  if(s.includes('akun') || s.includes('akaun') || s.includes('account') || s.includes('starter') || s.includes('reroll') || s.includes('whale') || s.includes('mid-end')) return '🔑';
  return '🏷️';
}

function getExistingSubgroups(cat){
  if(!cat || cat === 'all') return [];
  const list = [];
  const set = new Set();
  const targetCat = cat;

  // Ambil hanya dari produk yang benar-benar ada di memori untuk game ini (sesuai sub judul yang ada)
  (products || []).forEach(p => {
    if(p.cat === targetCat && p.subgroup && p.subgroup.trim()){
      const s = p.subgroup.trim();
      if(!set.has(s)){
        set.add(s);
        list.push(s);
      }
    }
  });

  return list;
}

function localizeSubgroupName(sub, lang = null){
  if(!sub) return '';
  const currentLang = (lang || currentSelectedCountry || 'ID').toUpperCase();
  const raw = sub.trim();
  const subLower = raw.toLowerCase();

  if(currentLang === 'MY'){
    // Bahasa Melayu (Malaysia)
    if(subLower === 'all' || subLower === 'semua') return 'Semua';
    if(subLower.includes('rawat')) return 'Rawat Akaun / Harian';
    if(subLower.includes('eksplor') || subLower.includes('explore') || subLower.includes('oculus')) return 'Eksplorasi Peta';
    if(subLower.includes('quest') || subLower.includes('misi')) return 'Quest & Misi';
    if(subLower.includes('top-up') || subLower.includes('topup') || subLower.includes('tambah nilai')) return 'Tambah Nilai / Top-Up';
    if(subLower.includes('joki')) return 'Servis Joki';
    if(subLower.includes('spiral abyss') || subLower.includes('abyss')) return 'Spiral Abyss & Cabaran';
    if(subLower.includes('moc') || subLower.includes('memory of chaos')) return 'Memory of Chaos';
    if(subLower.includes('pure fiction')) return 'Pure Fiction & Apocalyptic';
    if(subLower.includes('tower of adversity') || subLower.includes('tower')) return 'Tower of Adversity';
    if(subLower.includes('farming') || subLower.includes('material') || subLower.includes('calyx') || subLower.includes('echo') || subLower.includes('boss')) return 'Kumpul Bahan & Boss';
    if(subLower.includes('starter')) return 'Akaun Starter';
    if(subLower.includes('mid-end') || subLower.includes('pertengahan')) return 'Akaun Pertengahan';
    if(subLower.includes('endgame') || subLower.includes('whale')) return 'Akaun Endgame / Whale';
    if(subLower.includes('reroll')) return 'Akaun Reroll';
    if(subLower.includes('akun') || subLower.includes('account')) return 'Akaun Game';
    if(subLower.includes('reguler') || subLower.includes('lainnya') || subLower === '__none__') return 'Lain-lain / Biasa';
  } else if(currentLang === 'SG'){
    // English (Singapore)
    if(subLower === 'all' || subLower === 'semua') return 'All';
    if(subLower.includes('rawat')) return 'Daily Maintenance';
    if(subLower.includes('eksplor') || subLower.includes('explore') || subLower.includes('oculus')) return 'Map Exploration';
    if(subLower.includes('quest') || subLower.includes('misi')) return 'Quests & Missions';
    if(subLower.includes('top-up') || subLower.includes('topup') || subLower.includes('tambah nilai')) return 'Top-Up';
    if(subLower.includes('joki')) return 'Pilot & Boosting';
    if(subLower.includes('spiral abyss') || subLower.includes('abyss')) return 'Spiral Abyss & Endgame';
    if(subLower.includes('moc') || subLower.includes('memory of chaos')) return 'Memory of Chaos';
    if(subLower.includes('pure fiction')) return 'Pure Fiction & Apocalyptic';
    if(subLower.includes('tower of adversity') || subLower.includes('tower')) return 'Tower of Adversity';
    if(subLower.includes('farming') || subLower.includes('material') || subLower.includes('calyx') || subLower.includes('echo') || subLower.includes('boss')) return 'Boss & Material Farming';
    if(subLower.includes('starter')) return 'Starter Accounts';
    if(subLower.includes('mid-end') || subLower.includes('pertengahan')) return 'Mid-Tier Accounts';
    if(subLower.includes('endgame') || subLower.includes('whale')) return 'Endgame / Whale Accounts';
    if(subLower.includes('reroll')) return 'Reroll Accounts';
    if(subLower.includes('akun') || subLower.includes('account')) return 'Game Accounts';
    if(subLower.includes('reguler') || subLower.includes('lainnya') || subLower === '__none__') return 'Others / Regular';
  } else {
    // Bahasa Indonesia (ID)
    if(subLower === 'all' || subLower === 'semua') return 'Semua';
    if(subLower.includes('rawat')) return 'Rawat Akun / Harian';
    if(subLower.includes('eksplor') || subLower.includes('explore') || subLower.includes('oculus')) return 'Eksplorasi Map';
    if(subLower.includes('quest') || subLower.includes('misi')) return 'Quest & Misi';
    if(subLower.includes('top-up') || subLower.includes('topup')) return 'Top-Up';
    if(subLower.includes('joki')) return 'Jasa Joki';
    if(subLower.includes('spiral abyss') || subLower.includes('abyss')) return 'Spiral Abyss';
    if(subLower.includes('moc') || subLower.includes('memory of chaos')) return 'Memory of Chaos';
    if(subLower.includes('pure fiction')) return 'Pure Fiction';
    if(subLower.includes('tower of adversity') || subLower.includes('tower')) return 'Tower of Adversity';
    if(subLower.includes('farming') || subLower.includes('material') || subLower.includes('calyx') || subLower.includes('echo') || subLower.includes('boss')) return 'Farming Material & Boss';
    if(subLower.includes('starter')) return 'Akun Starter';
    if(subLower.includes('mid-end')) return 'Akun Mid-End';
    if(subLower.includes('endgame') || subLower.includes('whale')) return 'Akun Endgame / Whale';
    if(subLower.includes('reroll')) return 'Akun Reroll';
    if(subLower.includes('akun') || subLower.includes('account')) return 'Akun Game';
    if(subLower.includes('reguler') || subLower.includes('lainnya') || subLower === '__none__') return 'Lainnya / Reguler';
  }

  return raw;
}


const DEFAULT_PRODUCTS = [
  {id:1,name:"10 IF",price:25000,badge:"BEST",icon:"💎",desc:"Harga murah cocok untuk pertama kali",cat:"genshin",subgroup:"INTERTWINED FATE",images:['/prod_1.jpg']},
  {id:2,name:"20 IF",price:50000,badge:"BEST",icon:"💎",desc:"Harga murah cocok untuk pertama kali",cat:"genshin",subgroup:"INTERTWINED FATE",images:['/prod_2.jpg']},
  {id:3,name:"30 IF",price:75000,badge:"BEST",icon:"💎",desc:"Harga murah cocok untuk pertama kali",cat:"genshin",subgroup:"INTERTWINED FATE",images:['/prod_3.jpg']},
  {id:4,name:"40 IF",price:95000,badge:"POPULER",icon:"💎",desc:"Harga murah cocok untuk semua",cat:"genshin",subgroup:"INTERTWINED FATE",images:['/prod_4.jpg']},
  {id:5,name:"50 IF",price:125000,badge:"POPULER",icon:"💎",desc:"Harga murah cocok untuk semua",cat:"genshin",subgroup:"INTERTWINED FATE",images:['/prod_5.jpg']},
  {id:6,name:"60 IF",price:150000,badge:"POPULER",icon:"💎",desc:"Harga murah cocok untuk yang baru dapat uang",cat:"genshin",subgroup:"INTERTWINED FATE",images:['/prod_6.jpg']},
  {id:7,name:"100 IF",price:250000,badge:"New",icon:"💎",desc:"Harga murah cocok untuk yang baru dapat uang",cat:"genshin",subgroup:"INTERTWINED FATE",images:['/prod_7.jpg']},
  {id:8,name:"200 IF",price:500000,badge:"NEW",icon:"💎",desc:"Harga cocok untuk yang baru gajian",cat:"genshin",subgroup:"INTERTWINED FATE",images:['/prod_8.jpg']},
  {id:9,name:"EKSPLORE MONDSTADT",price:110000,badge:"BEST",icon:"✨",desc:"Eksploration all map mondstadt",cat:"genshin",subgroup:"EKSPLORATION",images:['/prod_9.jpg']},
  {id:10,name:"EKSPLORE LIYUE",price:165000,badge:"BEST",icon:"✨",desc:"Eksploration all map liyue",cat:"genshin",subgroup:"EKSPLORATION",images:['/prod_10.jpg']},
  {id:11,name:"EKSPLORE INAZUMA",price:200000,badge:"BEST",icon:"✨",desc:"Eksploration all map inazuma",cat:"genshin",subgroup:"EKSPLORATION",images:['/prod_11.jpg']},
  {id:12,name:"EKSPLORE FONTAINE",price:250000,badge:"BEST",icon:"✨",desc:"Eksploration all map fontaine",cat:"genshin",subgroup:"EKSPLORATION",images:['/prod_12.jpg']},
  {id:13,name:"EKSPLORE SUMERU",price:300000,badge:"BEST",icon:"✨",desc:"Eksploration all map sumeru",cat:"genshin",subgroup:"EKSPLORATION",images:['/prod_13.jpg']},
  {id:14,name:"EKSPLORE NATLAN",price:250000,badge:"POPULER",icon:"✨",desc:"Eksploration all map natlan",cat:"genshin",subgroup:"EKSPLORATION",images:['/prod_14.jpg']},
  {id:15,name:"EKSPLORE NODKRAI",price:180000,badge:"BEST",icon:"✨",desc:"Eksploration all map nodkrai",cat:"genshin",subgroup:"EKSPLORATION",images:['/prod_15.jpg']},
  {id:16,name:"EKSPLORE SNEZHNAYA",price:240000,badge:"NEW",icon:"✨",desc:"Eksploration all map snezhnaya",cat:"genshin",subgroup:"EKSPLORATION",images:['/prod_16.jpg']},
  {id:17,name:"Genshin account",price:350000,badge:"NEW",icon:"📦",desc:"Akun admin yang nganggur",cat:"lainnya",subgroup:"",isAccount:true,images:['/prod_17.jpg']},
  {id:18,name:"ARCHON MONDSTADT",price:30000,badge:"BASIC",icon:"🔥",desc:"All quest archon mondstadt",cat:"genshin",subgroup:"QUEST",images:['/prod_18.jpg']},
  {id:19,name:"ARCHON LIYUE",price:50000,badge:"BASIC",icon:"🔥",desc:"All quest archon liyue",cat:"genshin",subgroup:"QUEST",images:['/prod_19.jpg']},
  {id:20,name:"ARCHON INAZUMA",price:40000,badge:"BASIC",icon:"🔥",desc:"All quest archon inazuma",cat:"genshin",subgroup:"QUEST",images:['/prod_20.jpg']},
  {id:21,name:"ARCHON SUMERU",price:60000,badge:"BASIC",icon:"🔥",desc:"All quest archon sumeru",cat:"genshin",subgroup:"QUEST",images:['/prod_21.jpg']},
  {id:22,name:"ARCHON FONTAINE",price:60000,badge:"BASIC",icon:"🔥",desc:"All quest archon fontaine",cat:"genshin",subgroup:"QUEST",images:['/prod_22.jpg']},
  {id:25,name:"ARCHON NATLAN",price:50000,badge:"BASIC",icon:"🔥",desc:"All quest archon natlan",cat:"genshin",subgroup:"QUEST",images:['/prod_25.jpg']},
  {id:23,name:"ARCHON NODKRAI",price:80000,badge:"BASIC",icon:"🔥",desc:"All quest archon nodkrai",cat:"genshin",subgroup:"QUEST",images:['/prod_23.jpg']},
  {id:24,name:"ARCHON SNEZHNAYA",price:30000,badge:"BASIC",icon:"🔥",desc:"All quest archon snezhnaya",cat:"genshin",subgroup:"QUEST",images:['/prod_24.jpg']},
  {id:50,name:"HANGOUT/chapter",price:8000,badge:"BASIC",icon:"🔥",desc:"Hangout/chap",cat:"genshin",subgroup:"QUEST",images:['/prod_50.jpg']},
  {id:52,name:"ARANARA",price:250000,badge:"ANOMALI",icon:"🔥",desc:"All aranara clear",cat:"genshin",subgroup:"QUEST",images:['/prod_52.jpg']},
  {id:49,name:"STORY QUEST/chapter",price:10000,badge:"BASIC",icon:"🔥",desc:"Story quest/chap",cat:"genshin",subgroup:"QUEST",images:['/prod_49.jpg']},
  {id:51,name:"WORLD QUEST/chapter",price:15000,badge:"NEW",icon:"🔥",desc:"World quest/chapter",cat:"genshin",subgroup:"QUEST",images:['/prod_51.jpg']},
  {id:53,name:"ALL QUEST",price:300000,badge:"ANOMALI",icon:"🔥",desc:"All quest clear yang tersedia tidak termasuk quest archon",cat:"genshin",subgroup:"QUEST",images:['/prod_53.jpg']},
  {id:54,name:"DAILY",price:3000,badge:"NEW",icon:"⚡",desc:"Daily bp, Daily comission, Resin, Ekspedisi",cat:"genshin",subgroup:"RAWAT ACCOUNT",images:['/prod_54.jpg']},
  {id:55,name:"WEEKLY",price:21000,badge:"NEW",icon:"⚡",desc:"Daily bp, Daily comission, Resin, Ekspedisi, Reputasi",cat:"genshin",subgroup:"RAWAT ACCOUNT",images:['/prod_55.jpg']},
  {id:56,name:"MONTHLY",price:93000,badge:"NEW",icon:"⚡",desc:"Daily bp, Daily comission, Resin, Ekspedisi, Reputasi, Weekly boss, Event",cat:"genshin",subgroup:"RAWAT ACCOUNT",images:['/prod_56.jpg']},
  {id:57,name:"LVL 1 - 40",price:5000,badge:"NEW",icon:"⚡",desc:"Up level karakter 1-40",cat:"genshin",subgroup:"RAWAT ACCOUNT",images:['/prod_57.jpg']},
  {id:58,name:"LVL 40 - 50",price:8000,badge:"NEW",icon:"⚡",desc:"Up level karakter 40-50",cat:"genshin",subgroup:"RAWAT ACCOUNT",images:['/prod_58.jpg']},
  {id:59,name:"LVL 50 - 60",price:12000,badge:"NEW",icon:"⚡",desc:"Up level karakter 50-60",cat:"genshin",subgroup:"RAWAT ACCOUNT",images:['/prod_59.jpg']},
  {id:60,name:"LVL 60 - 70",price:14000,badge:"NEW",icon:"⚡",desc:"Up level karakter 60-70",cat:"genshin",subgroup:"RAWAT ACCOUNT",images:['/prod_60.jpg']},
  {id:61,name:"LVL 70 - 80",price:17000,badge:"NEW",icon:"⚡",desc:"Up level karakter 70-80",cat:"genshin",subgroup:"RAWAT ACCOUNT",images:['/prod_61.jpg']},
  {id:62,name:"LVL 80 - 90",price:20000,badge:"NEW",icon:"⚡",desc:"Up level karakter 80-90",cat:"genshin",subgroup:"RAWAT ACCOUNT",images:['/prod_62.jpg']},
  {id:63,name:"CULUS/PCS",price:1000,badge:"NEW",icon:"✴️",desc:"Joki culus persatunya",cat:"genshin",subgroup:"OTHER",images:['/prod_63.jpg']},
  {id:64,name:"MONSTER DROP/PCS",price:500,badge:"NEW",icon:"✴️",desc:"Kumpulkan item dari monster persatunya",cat:"genshin",subgroup:"OTHER",images:['/prod_64.jpg']},
  {id:65,name:"MATERIAL",price:500,badge:"NEW",icon:"✴️",desc:"Kumpulkan material dari monster persatunya",cat:"genshin",subgroup:"OTHER",images:['/prod_65.jpg']},
  {id:66,name:"EVENT",price:10000,badge:"NEW",icon:"✴️",desc:"All event harga sesuai kerumitan event",cat:"genshin",subgroup:"OTHER",images:['/prod_66.jpg']},
  {id:26,name:"10 RT",price:25000,badge:"BEST",icon:"✨",desc:"Harga murah cocok untuk pertama kali",cat:"wuwa",subgroup:"RADIANT TIDE",images:['/prod_26.jpg']},
  {id:27,name:"20 RT",price:50000,badge:"BEST",icon:"✨",desc:"Harga murah cocok untuk pertama kali",cat:"wuwa",subgroup:"RADIANT TIDE",images:['/prod_27.jpg']},
  {id:28,name:"30 RT",price:75000,badge:"BEST",icon:"✨",desc:"Harga murah cocok untuk pertama kali",cat:"wuwa",subgroup:"RADIANT TIDE",images:['/prod_28.jpg']},
  {id:29,name:"40 RT",price:95000,badge:"POPULER",icon:"✨",desc:"Harga murah cocok untuk semua",cat:"wuwa",subgroup:"RADIANT TIDE",images:['/prod_29.jpg']},
  {id:30,name:"50 RT",price:125000,badge:"BEST",icon:"✨",desc:"Harga murah cocok untuk semua",cat:"wuwa",subgroup:"RADIANT TIDE",images:['/prod_30.jpg']},
  {id:31,name:"60 RT",price:150000,badge:"BEST",icon:"✨",desc:"Harga murah cocok untuk yang baru dapat uang",cat:"wuwa",subgroup:"RADIANT TIDE",images:['/prod_31.jpg']},
  {id:32,name:"100 RT",price:200000,badge:"BEST",icon:"✨",desc:"Harga cocok untuk yang baru gajian",cat:"wuwa",subgroup:"RADIANT TIDE",images:['/prod_32.jpg']},
  {id:33,name:"200 RT",price:500000,badge:"BEST",icon:"✨",desc:"Harga cocok untuk yang baru gajian",cat:"wuwa",subgroup:"RADIANT TIDE",images:['/prod_33.jpg']},
  {id:35,name:"EKSPLORE LAHAI ROI",price:250000,badge:"BEST",icon:"✨",desc:"Eksploration all map lahai roy",cat:"wuwa",subgroup:"EKSPLORATION",images:['/prod_35.jpg']},
  {id:36,name:"EKSPLORE RINASCITA",price:250000,badge:"BEST",icon:"✨",desc:"Eksploration all map rinascita",cat:"wuwa",subgroup:"EKSPLORATION",images:['/prod_36.jpg']},
  {id:34,name:"EKSPLORE HUANGLONG",price:200000,badge:"BEST",icon:"✨",desc:"Eksploration all map huanglong",cat:"wuwa",subgroup:"EKSPLORATION",images:['/prod_34.jpg']},
  {id:37,name:"EKSPLORE MENGZHOU",price:120000,badge:"BEST",icon:"✨",desc:"Eksploration all map mengzhou",cat:"wuwa",subgroup:"EKSPLORATION",images:['/prod_37.jpg']},
  {id:38,name:"EKSPLORE BLACK SHORES",price:40000,badge:"BEST",icon:"✨",desc:"Eksploration all map mengzhou",cat:"wuwa",subgroup:"EKSPLORATION",images:['/prod_38.jpg']},
  {id:39,name:"STORY QUEST",price:15000,badge:"BEST",icon:"✨",desc:"All story quest",cat:"wuwa",subgroup:"QUEST",images:['/prod_39.jpg']},
  {id:40,name:"EKSPLORATION QUEST",price:15000,badge:"BEST",icon:"✨",desc:"All eksploration quest",cat:"wuwa",subgroup:"QUEST",images:['/prod_40.jpg']},
  {id:41,name:"COMPANION QUEST",price:10000,badge:"BEST",icon:"✨",desc:"All companion quest",cat:"wuwa",subgroup:"QUEST",images:['/prod_41.jpg']},
  {id:42,name:"SIDE QUEST",price:5000,badge:"BEST",icon:"✨",desc:"All companion quest",cat:"wuwa",subgroup:"QUEST",images:['/prod_42.jpg']},
  {id:43,name:"10 SD",price:20000,badge:"NEW",icon:"💎",desc:"Harga murah cocok untuk pertama kali",cat:"nte",subgroup:"SOLID DISK",images:['/prod_43.jpg']},
  {id:44,name:"20 SD",price:50000,badge:"NEW",icon:"💎",desc:"Harga murah cocok untuk pertama kali",cat:"nte",subgroup:"SOLID DISK",images:['/prod_44.jpg']},
  {id:45,name:"30 SD",price:75000,badge:"NEW",icon:"💎",desc:"Harga murah cocok untuk pertama kali",cat:"nte",subgroup:"SOLID DISK",images:['/prod_45.jpg']},
  {id:46,name:"40 SD",price:95000,badge:"NEW",icon:"💎",desc:"Harga cocok untuk semua",cat:"nte",subgroup:"SOLID DISK",images:['/prod_46.jpg']},
  {id:47,name:"50 SD",price:125000,badge:"NEW",icon:"💎",desc:"Harga cocok untuk semua",cat:"nte",subgroup:"SOLID DISK",images:['/prod_47.jpg']},
  {id:48,name:"60 SD",price:150000,badge:"NEW",icon:"💎",desc:"Harga cocok untuk semua",cat:"nte",subgroup:"SOLID DISK",images:['/prod_48.jpg']}
];
const products = DEFAULT_PRODUCTS;
console.log('Total products:', products.length);

const idPattern = /(?:harga|cocok|untuk|semua|pertama|kali|yang|baru|dapat|uang|gajian|nganggur|joki|kumpulkan|persatu|persatunya|tidak|termasuk|tersedia|eksplor|rawat|bulan|minggu|hari|jam|menit|karakter|bintang|paket|hemat|siap|pakai|main|garansi|layanan|misi|tugas|buat|dari|sampai|hingga|dengan|tanpa|hanya|cuma|sudah|udah|gak|nggak)/i;

let issues = 0;
products.forEach(p => {
  const transName = translateProductName(p.name, 'SG');
  const transDesc = translateProductDesc(p.desc, 'SG');
  const transSub = localizeSubgroupName(p.subgroup, 'SG');
  
  const nameMatch = transName.match(idPattern);
  const descMatch = transDesc.match(idPattern);
  const subMatch = transSub.match(idPattern);

  if(nameMatch || descMatch || subMatch){
    issues++;
    console.log('--- ISSUE on Product ID ' + p.id + ' (' + p.name + ') ---');
    if(nameMatch) console.log('  NAME:', p.name, '==>', transName, '[Matched:', nameMatch[0] + ']');
    if(descMatch) console.log('  DESC:', p.desc, '==>', transDesc, '[Matched:', descMatch[0] + ']');
    if(subMatch) console.log('  SUB:', p.subgroup, '==>', transSub, '[Matched:', subMatch[0] + ']');
  }
});

console.log('Total issues found in products:', issues);
