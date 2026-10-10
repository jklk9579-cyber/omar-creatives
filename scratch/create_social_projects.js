import fs from 'fs';

const newProjects = [
  {
    slug: 'cafe-d-specialty-coffee',
    title: 'Cafe D – Specialty Coffee & Bakery Social Campaign',
    title_ar: 'كافيه دي – حملة سوشيال ميديا لعلامة قهوة ومخبوزات مختصة',
    description: 'A contemporary visual identity and multi-post social media campaign crafted for Cafe D, featuring artisanal coffee brewing, bakery aesthetics, and warm ambient typography.',
    description_ar: 'هوية بصرية معاصرة وحملة بوستات سوشيال ميديا لـ Cafe D، تسلط الضوء على ثقافة القهوة المختصة والمخبوزات الطازجة بتدرجات دافئة وإخراج بصري عالي الجاذبية.',
    date: '2026-03-15',
    cover: '/images/scocial-media-designs/Cafe D1.png',
    gallery: [
      '/images/scocial-media-designs/Cafe D1.png',
      '/images/scocial-media-designs/Cafe D2.png',
      '/images/scocial-media-designs/Cafe D3.png',
      '/images/scocial-media-designs/Cafe D4.png',
      '/images/scocial-media-designs/Cafe D5.png',
      '/images/scocial-media-designs/Cafe D6.png'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Cafe D Specialty Coffee',
    client_ar: 'كافيه دي للقهوة المختصة',
    featured: true,
    tags: ['Social Media', 'Branding', 'Coffee', 'Hospitality', 'Visual Identity']
  },
  {
    slug: 'el-thob-luxury-fashion',
    title: 'El Thob – Luxury Saudi Menswear Brand Campaign',
    title_ar: 'الثوب – حملة أزياء رجالية سعودية فاخرة',
    description: 'Sophisticated social media campaigns celebrating Saudi sartorial heritage and modern elegance, presenting seasonal fabric textures, precision tailoring, and heritage styling.',
    description_ar: 'سلسلة تصاميم وحملة إعلانية راقية تحتفي بهيبة وأناقة الثوب السعودي بتفاصيل الأقمشة الفاخرة، والإضاءة السينمائية، والتطريز المتقن للشباب والرجال.',
    date: '2026-03-20',
    cover: '/images/scocial-media-designs/Elthob 1.png',
    gallery: [
      '/images/scocial-media-designs/Elthob 1.png',
      '/images/scocial-media-designs/Elthob 2.png',
      '/images/scocial-media-designs/Elthob 3.png',
      '/images/scocial-media-designs/Elthob 4.png'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'El Thob Menswear',
    client_ar: 'علامة الثوب للأزياء الفاخرة',
    featured: true,
    tags: ['Fashion', 'Social Media', 'Saudi Heritage', 'Luxury', 'E-commerce']
  },
  {
    slug: 'car-new-motors-campaign',
    title: 'Car New Motors – Automotive Dealership Social Series',
    title_ar: 'كار نيو موتورز – حملة تسويقية لمعرض سيارات فاخرة',
    description: 'High-octane social media ad series engineered for premier automotive dealerships, featuring dynamic lighting, specs typography, and commercial automotive retouching.',
    description_ar: 'سلسلة بوستات إعلانية عالية الحيوية لمعرض سيارات حديث، تركز على القوة، الفخامة، عروض التمويل، والإخراج البصري الديناميكي لهياكل السيارات.',
    date: '2026-03-10',
    cover: '/images/scocial-media-designs/Car New2.png',
    gallery: [
      '/images/scocial-media-designs/Car New2.png',
      '/images/scocial-media-designs/Car New3.png',
      '/images/scocial-media-designs/Car New4.png'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Car New Motors',
    client_ar: 'كار نيو للسيارات',
    featured: false,
    tags: ['Automotive', 'Social Media', 'Advertising', 'Commercial Retouching']
  },
  {
    slug: 'saudi-digital-brain-riyadh',
    title: 'Saudi Digital Brain Riyadh – AI & Tech Innovation Campaign',
    title_ar: 'العقل الرقمي السعودي الرياض – حملة الابتكار والذكاء الاصطناعي',
    description: 'Visionary promotional graphics and thought-leadership campaign designed for Saudi Digital Brain in Riyadh, symbolizing neural networks, cloud computing, and digital transformation.',
    description_ar: 'تصاميم إعلانية وفكرية مبتكرة لـ "العقل الرقمي السعودي" في الرياض، تجسد قوة الشبكات العصبية والحوسبة السحابية والتحول الرقمي لمستقبل المملكة.',
    date: '2026-02-28',
    cover: '/images/scocial-media-designs/Saudi_Digital_Brain_Riyadh_202606271733.jpeg',
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Saudi Digital Brain',
    client_ar: 'العقل الرقمي السعودي - الرياض',
    featured: true,
    tags: ['AI', 'Tech', 'Riyadh', 'Digital Transformation', 'Vision 2030']
  },
  {
    slug: 'modern-arabic-furniture',
    title: 'Modern Arabic Furniture – Interior Living Social Ads',
    title_ar: 'الأثاث العربي المعاصر – تصاميم وإعلانات الديكور المنزلي',
    description: 'Cinematic interior design promo graphics combining contemporary Scandinavian minimalism with authentic Arabic aesthetic flourishes and seasonal sales promotion.',
    description_ar: 'تصاميم إعلانية سينمائية للمفروشات والأثاث المنزلي المعاصر تدمج بين البساطة الراقية واللمسات الشرقية الأصيلة مع إبراز عروض التخفيضات.',
    date: '2026-02-18',
    cover: '/images/scocial-media-designs/Modern_Arabic_furniture_advertisement_design,_202605141742.jpeg',
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Modern Living Furniture',
    client_ar: 'مفروشات الحياة المعاصرة',
    featured: false,
    tags: ['Furniture', 'Interior Design', 'Social Media', 'Arabic Typography']
  },
  {
    slug: 'aqar-solutions-real-estate',
    title: 'Aqar Solutions – Real Estate & Property Investment Campaign',
    title_ar: 'حلول عقارية – حملة تسويق وإعلانات الاستثمار العقاري',
    description: 'High-converting real estate promotional posts tailored for luxury residential units, investment properties, and institutional architectural developments.',
    description_ar: 'بوستات إعلانية تسويقية للفرص والاستثمارات العقارية الفاخرة، مصممة لتحقيق أعلى معدلات تفاعل واهتمام من المشترين والمستثمرين.',
    date: '2026-02-12',
    cover: '/images/scocial-media-designs/بوست حلول عقارية.png',
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Aqar Solutions',
    client_ar: 'حلول عقارية',
    featured: false,
    tags: ['Real Estate', 'Investment', 'Architecture', 'Social Media']
  },
  {
    slug: 'dental-aesthetic-clinic',
    title: 'Dental Aesthetic Clinic – Smile Care Social Campaign',
    title_ar: 'عيادة تجميل الأسنان – حملة رعاية وابتسامة هوليوود',
    description: 'Clean medical and cosmetic dentistry social media design highlighting dental health, porcelain veneers, and patient trust with warm, professional aesthetics.',
    description_ar: 'تصميم إعلاني مريح واحترافي لعيادة طب وتجميل الأسنان، يبرز خدمات ابتسامة هوليوود وتقويم الأسنان بروح طبية موثوقة وجذابة.',
    date: '2026-02-05',
    cover: '/images/scocial-media-designs/عيادة اسنان تصميم.jpeg',
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Dental Care Clinic',
    client_ar: 'عيادة رعاية وتجميل الأسنان',
    featured: false,
    tags: ['Healthcare', 'Dental', 'Medical Design', 'Social Media']
  },
  {
    slug: 'gourmet-restaurant-branding',
    title: 'Gourmet Restaurant – Culinary Social Media Creative',
    title_ar: 'مطعم الذواقة – إعلانات وتصاميم الضيافة الراقية',
    description: 'Mouth-watering hospitality social campaign focusing on chef-crafted dishes, vibrant ingredients, and fine dining atmosphere for maximum engagement.',
    description_ar: 'تصميم سوشيال ميديا إبداعي لمطعم راقٍ يسلط الضوء على تفاصيل الأطباق الفاخرة وتناغم المكونات لفتح الشهية وتحفيز الحجوزات.',
    date: '2026-01-28',
    cover: '/images/scocial-media-designs/تصميم المطعم.png',
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Gourmet Dining',
    client_ar: 'مطعم الذواقة',
    featured: false,
    tags: ['Food', 'Restaurant', 'Hospitality', 'Creative Design']
  },
  {
    slug: 'marketing-power-educational',
    title: 'Strategic Marketing – The Power of Brand Growth Series',
    title_ar: 'أهمية التسويق – سلسلة توعوية لنمو العلامات التجارية',
    description: 'Educational social media carousel and infographic content explaining market positioning, consumer psychology, and the ROI of strategic design.',
    description_ar: 'سلسلة منشورات تعليمية وتوعوية تشرح أهمية التسويق الرقمي وبناء الوعي بالعلامة التجارية وقوة التصميم في مضاعفة المبيعات.',
    date: '2026-01-20',
    cover: '/images/scocial-media-designs/أهمية التسويق.jpeg',
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Growth Agency',
    client_ar: 'وكالة النمو التسويقي',
    featured: false,
    tags: ['Marketing', 'Infographic', 'Educational', 'Branding Strategy']
  },
  {
    slug: 'berni-biyad-fmcg-beverages',
    title: 'Berni & Biyad – FMCG Product & Beverage Visual Ads',
    title_ar: 'بيرني وبياض – إعلانات وبوستات منتجات المشروبات الطبيعية',
    description: 'Vibrant, refreshing product photography and 3D visual ads highlighting natural beverage packaging, fruity freshness, and energetic social mockups.',
    description_ar: 'تصاميم إعلانية بصرية منعشة ومفعمة بالحيوية لمنتجات العصائر والمشروبات الطبيعية مع إبراز عبوات المنتج والنكهات الغنية.',
    date: '2026-01-15',
    cover: '/images/scocial-media-designs/product-berni.jpg',
    gallery: [
      '/images/scocial-media-designs/product-berni.jpg',
      '/images/scocial-media-designs/product-biyad.jpg'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Berni & Biyad Beverages',
    client_ar: 'مشروبات بيرني وبياض',
    featured: false,
    tags: ['FMCG', 'Packaging', 'Product Ad', 'Beverages', '3D Visuals']
  },
  {
    slug: 'procare-medical-derma',
    title: 'ProCare – Advanced Skincare & Derma Social Series',
    title_ar: 'برو كير – حملة العناية المتقدمة بالبشرة والجلدية',
    description: 'Clinical yet elegant social media campaign for medical aesthetic and derma products, conveying purity, scientific validation, and premium skincare routines.',
    description_ar: 'سلسلة تصاميم طبية وتجميلية متطورة لمنتجات برو كير للعناية بالبشرة، تجمع بين النقاء والمصداقية العلمية وأناقة الإخراج البصري.',
    date: '2026-01-10',
    cover: '/images/scocial-media-designs/procare social media 1/design 4.png',
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'ProCare Derma',
    client_ar: 'برو كير للجلدية والتجميل',
    featured: false,
    tags: ['Skincare', 'Derma', 'Medical Design', 'Social Media']
  },
  {
    slug: 'darrow-brand-commercial',
    title: 'D Arrow – Creative Agency Visual Identity Showcase',
    title_ar: 'دي آرو – هوية وتصاميم الوكالة الإعلانية',
    description: 'Bold geometric layouts and energetic social media promotional posters developed for D Arrow agency, combining bold typography with architectural spatial design.',
    description_ar: 'تصاميم قوية بهندسة بصرية وجرأة في الخطوط والألوان صُممت لوكالة دي آرو للتعبير عن التفكير الإبداعي غير التقليدي.',
    date: '2026-01-05',
    cover: '/images/scocial-media-designs/D Arrow First Page.png',
    gallery: [
      '/images/scocial-media-designs/D Arrow First Page.png',
      '/images/scocial-media-designs/darrow-4.jpeg'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'D Arrow Agency',
    client_ar: 'وكالة دي آرو',
    featured: false,
    tags: ['Branding', 'Agency', 'Creative Direction', 'Social Media']
  }
];

for (const p of newProjects) {
  const mdPath = `src/content/projects/${p.slug}.md`;
  const galleryYaml = p.gallery ? `\ngallery:\n${p.gallery.map(g => `  - "${g}"`).join('\n')}` : '';
  const tagsYaml = p.tags ? `\ntags:\n${p.tags.map(t => `  - "${t}"`).join('\n')}` : '';
  
  const content = `---
title: "${p.title}"
title_ar: "${p.title_ar}"
description: "${p.description}"
description_ar: "${p.description_ar}"
date: ${p.date}
cover: "${p.cover}"${galleryYaml}
category: "${p.category}"
category_ar: "${p.category_ar}"
client: "${p.client}"
client_ar: "${p.client_ar}"
featured: ${p.featured}${tagsYaml}
---

<div class="content-en">

## Project Overview

${p.description}

### Creative Strategy & Execution

- Tailored aesthetic aligned with target demographics and brand identity
- Multi-channel post templates optimized for Instagram, Twitter/X, and LinkedIn
- High-contrast typography hierarchy ensuring readability across mobile feeds
- High-resolution visual compositing and color grading

</div>

<div class="content-ar" dir="rtl">

## تفاصيل المشروع

${p.description_ar}

### استراتيجية التصميم والتنفيذ

- صياغة أسلوب بصري متكامل يتناغم مع هوية العلامة التجارية والجمهور المستهدف
- إعداد مقاسات مخصصة ومتجاوبة لمنصات إنستغرام، إكس، ولينكد إن
- توازن دقيق بين النصوص والرسائل الإعلانية لضمان سرعة لفت الانتباه وزيادة التفاعل
- معالجة وإخراج لوني سينمائي عالي الدقة لإبراز تفاصيل المنتج والخدمة

</div>
`;

  fs.writeFileSync(mdPath, content, 'utf8');
  console.log(`Created ${mdPath}`);
}
