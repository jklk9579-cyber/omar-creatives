const fs = require('fs');
const path = require('path');

const projects = [
  {
    slug: 'brand-x-burger-campaign',
    title: 'Brand X – Gourmet Burger Social Media Campaign',
    title_ar: 'براند إكس – حملة سوشيال ميديا لمطاعم البرجر الفاخر',
    description: 'High-retention commercial social media ad suite for Brand X Gourmet Burger, featuring sizzling smash burgers, dynamic typography hierarchy, and culturally tailored Saudi creative copywriting.',
    description_ar: 'سلسلة إعلانات سوشيال ميديا تجارية عالية الجاذبية لمطاعم براند إكس برجر، بتكوينات بصرية مشهية، وإضاءة درامية، ونصوص تسويقية موجهة بلهجة سعودية جذابة.',
    date: '2026-03-30',
    cover: '/images/scocial-media-designs/1.png',
    gallery: [
      '/images/scocial-media-designs/1.png',
      '/images/scocial-media-designs/2.png',
      '/images/scocial-media-designs/3.png',
      '/images/scocial-media-designs/4.png',
      '/images/scocial-media-designs/5.png'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Brand X Burger',
    client_ar: 'براند إكس برجر',
    featured: true,
    tags: ['Burger', 'Food Branding', 'Social Media', 'Saudi Arabia', 'Commercial Ad']
  },
  {
    slug: 'brand-x-luxury-footwear',
    title: 'Brand X – Luxury Leather Footwear & Heritage Sandals',
    title_ar: 'براند إكس – تصاميم وإعلانات النعال والأحذية الجلدية الفاخرة',
    description: 'Premium social media product launch for handcrafted genuine leather sandals, emphasizing luxury textures, night architectural backdrop, and prestige branding.',
    description_ar: 'تصميم إعلاني راق لإطلاق تشكيلة النعال والأحذية المصنوعة من الجلد الطبيعي الفاخر، بإضاءة رخامية وأجواء ليلية تبرز الفخامة والأصالة.',
    date: '2026-03-29',
    cover: '/images/scocial-media-designs/Artboard 1 copy.png',
    gallery: [
      '/images/scocial-media-designs/Artboard 1 copy.png'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Brand X Footwear',
    client_ar: 'براند إكس للأحذية الفاخرة',
    featured: true,
    tags: ['Luxury', 'Leather Footwear', 'Sandals', 'Social Media', 'Saudi Fashion']
  },
  {
    slug: 'cyber-heritage-saudi-concept',
    title: 'Cyber-Heritage Saudi – Futuristic Neon Palm & Digital Thobe',
    title_ar: 'أصالة المستقبل – الثوب السيبراني ونخيل النيون الرقمي',
    description: 'Futuristic AI-driven visual campaign blending authentic Saudi heritage thobe fashion with luminescent circuit neon palm trees in the Arabian desert.',
    description_ar: 'عمل إبداعي تجريبي يدمج بين الثوب السعودي الأصيل وعناصر المستقبل الرقمي مع نخلة النيون المضيئة في قلب رمال الصحراء.',
    date: '2026-03-28',
    cover: '/images/scocial-media-designs/combine_the_two_202603290117.png',
    gallery: [
      '/images/scocial-media-designs/combine_the_two_202603290117.png'
    ],
    category: 'AI Content',
    category_ar: 'محتوى بالذكاء الاصطناعي',
    client: 'Creative Concept',
    client_ar: 'مفاهيم بصرية مستقبلية',
    featured: true,
    tags: ['AI Content', 'Futuristic', 'Saudi Heritage', 'Neon', 'Digital Art']
  },
  {
    slug: 'specialty-coffee-3d-kiosk',
    title: 'Specialty Coffee Kiosk – 3D Isometric Social Ad Concept',
    title_ar: 'كافيه ومقهى مختص – تصور إعلاني ثلاثي الأبعاد',
    description: 'Vibrant isometric 3D visual concept combining a neon-lit modern coffee pavilion with authentic Saudi hospitality imagery and atmospheric lighting.',
    description_ar: 'تصور إعلاني ثلاثي الأبعاد معاصر يدمج بين كشك القهوة الحديث بإضاءة نيون وردية وجلسات كلاسيكية مع هوية القهوة المختصة.',
    date: '2026-03-27',
    cover: '/images/scocial-media-designs/social media design concept.png',
    gallery: [
      '/images/scocial-media-designs/social media design concept.png'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Specialty Coffee Studio',
    client_ar: 'استوديو القهوة المختصة',
    featured: true,
    tags: ['Coffee', '3D Design', 'Hospitality', 'Social Media', 'Visual Concept']
  },
  {
    slug: 'darrow-brand-commercial',
    title: 'D Arrow – Integrated Digital Marketing & Social Campaign',
    title_ar: 'دي آرو – حملة التسويق الرقمي والسوشيال ميديا المتكاملة',
    description: 'Comprehensive multi-platform campaign for D Arrow marketing agency, including e-commerce awareness posts, bold newspaper offers, and conversion-focused social graphics.',
    description_ar: 'حملة إعلانية وتسويقية شاملة لوكالة دي آرو، تضم إعلانات المتاجر الإلكترونية، بوستات الصحف والعروض الحصرية، وتصاميم نمو العلامات التجارية.',
    date: '2026-03-26',
    cover: '/images/scocial-media-designs/D Arrow First Page.png',
    gallery: [
      '/images/scocial-media-designs/D Arrow First Page.png',
      '/images/scocial-media-designs/فكرة تصميم اخري.png',
      '/images/scocial-media-designs/فكرة اعلان.jpeg',
      '/images/scocial-media-designs/كونسبت بوست.jpeg',
      '/images/scocial-media-designs/online store post.jpeg',
      '/images/scocial-media-designs/post design concept.png',
      '/images/scocial-media-designs/darrow-4.jpeg'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'D Arrow Agency',
    client_ar: 'وكالة دي آرو للتسويق',
    featured: true,
    tags: ['Marketing Agency', 'Social Media', 'E-commerce', 'Advertising', 'Branding']
  },
  {
    slug: 'procare-medical-derma',
    title: 'ProCare – Home Healthcare & Advanced Nursing Campaign',
    title_ar: 'برو كير – حملة الرعاية الطبية والتمريض المنزلي المتقدم',
    description: 'Clinical yet deeply reassuring medical ad campaign for ProCare home nursing and medical care, communicating high medical standards and 24/7 patient tranquility.',
    description_ar: 'سلسلة إعلانية وتوعوية متقدمة لخدمات الرعاية الصحية والتمريض المنزلي من برو كير، تجمع بين الاحترافية الطبية وطمأنينة العائلة.',
    date: '2026-03-25',
    cover: '/images/scocial-media-designs/procare social media 1/design 4.png',
    gallery: [
      '/images/scocial-media-designs/procare social media 1/design 4.png',
      '/images/scocial-media-designs/procare  2/ChatGPT Image Jun 24, 2026, 05_08_03 AM.png'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'ProCare Medical',
    client_ar: 'برو كير للرعاية الطبية',
    featured: true,
    tags: ['Healthcare', 'Medical Design', 'Home Nursing', 'Social Media']
  },
  {
    slug: 'modern-arabic-furniture',
    title: 'Modern Arabic Furniture – Interior Living Social Ads',
    title_ar: 'الأثاث العربي المعاصر – تصاميم وإعلانات الديكور المنزلي',
    description: 'Cinematic interior design promo graphics combining contemporary Scandinavian minimalism with authentic Arabic aesthetic flourishes and seasonal sales promotion.',
    description_ar: 'تصاميم إعلانية سينمائية للمفروشات والأثاث المنزلي المعاصر تدمج بين البساطة الراقية واللمسات الشرقية الأصيلة مع إبراز عروض التخفيضات.',
    date: '2026-03-24',
    cover: '/images/scocial-media-designs/Modern_Arabic_furniture_advertisement_design,_202605141742.jpeg',
    gallery: [
      '/images/scocial-media-designs/Modern_Arabic_furniture_advertisement_design,_202605141742.jpeg',
      '/images/scocial-media-designs/شيل_ده_وحط_نسبة_الخصم_202605141740.jpeg'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Modern Living Furniture',
    client_ar: 'مفروشات الحياة المعاصرة',
    featured: true,
    tags: ['Furniture', 'Interior Design', 'Social Media', 'Arabic Typography']
  },
  {
    slug: 'dental-aesthetic-clinic',
    title: 'Dental Aesthetic Clinic – Smile Care Social Campaign',
    title_ar: 'عيادة تجميل الأسنان – حملة رعاية وابتسامة هوليوود',
    description: 'Clean medical and cosmetic dentistry social media design highlighting dental health, porcelain veneers, and patient trust with warm, professional aesthetics.',
    description_ar: 'تصميم إعلاني مريح واحترافي لعيادة طب وتجميل الأسنان، يبرز خدمات ابتسامة هوليوود وتقويم الأسنان بروح طبية موثوقة وجذابة.',
    date: '2026-03-23',
    cover: '/images/scocial-media-designs/عيادة اسنان تصميم.jpeg',
    gallery: [
      '/images/scocial-media-designs/عيادة اسنان تصميم.jpeg',
      '/images/scocial-media-designs/Cinematic_ultra-realistic_4K_scene_of_202604282106.jpeg'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Dental Care Clinic',
    client_ar: 'عيادة رعاية وتجميل الأسنان',
    featured: true,
    tags: ['Healthcare', 'Dental', 'Medical Design', 'Social Media']
  },
  {
    slug: 'car-new-motors-campaign',
    title: 'Car New Motors – Automotive Dealership Social Series',
    title_ar: 'كار نيو موتورز – حملة تسويقية لمعرض سيارات فاخرة',
    description: 'High-octane social media ad series engineered for premier automotive dealerships, featuring dynamic lighting, specs typography, and commercial automotive retouching.',
    description_ar: 'سلسلة بوستات إعلانية عالية الحيوية لمعرض سيارات حديث، تركز على القوة، الفخامة، عروض التمويل، والإخراج البصري الديناميكي لهياكل السيارات.',
    date: '2026-03-22',
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
    featured: true,
    tags: ['Automotive', 'Social Media', 'Advertising', 'Commercial Retouching']
  },
  {
    slug: 'gourmet-restaurant-branding',
    title: 'Gourmet Restaurant – Culinary Social Media Creative',
    title_ar: 'مطعم الذواقة – إعلانات وتصاميم الضيافة الراقية',
    description: 'Mouth-watering hospitality social campaign focusing on chef-crafted dishes, vibrant ingredients, and fine dining atmosphere for maximum engagement.',
    description_ar: 'تصميم سوشيال ميديا إبداعي لمطعم راق يسلط الضوء على تفاصيل الأطباق الفاخرة وتناغم المكونات لفتح الشهية وتحفيز الحجوزات.',
    date: '2026-03-21',
    cover: '/images/scocial-media-designs/تصميم المطعم.png',
    gallery: [
      '/images/scocial-media-designs/تصميم المطعم.png'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Gourmet Dining',
    client_ar: 'مطعم الذواقة',
    featured: true,
    tags: ['Food', 'Restaurant', 'Hospitality', 'Creative Design']
  },
  {
    slug: 'aqar-solutions-real-estate',
    title: 'Aqar Solutions – Real Estate & Property Investment Campaign',
    title_ar: 'حلول عقارية – حملة تسويق وإعلانات الاستثمار العقاري',
    description: 'High-converting real estate promotional posts tailored for luxury residential units, investment properties, and institutional architectural developments.',
    description_ar: 'بوستات إعلانية تسويقية للفرص والاستثمارات العقارية الفاخرة، مصممة لتحقيق أعلى معدلات تفاعل واهتمام من المشترين والمستثمرين.',
    date: '2026-03-20',
    cover: '/images/scocial-media-designs/بوست حلول عقارية.png',
    gallery: [
      '/images/scocial-media-designs/بوست حلول عقارية.png'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Aqar Solutions',
    client_ar: 'حلول عقارية',
    featured: true,
    tags: ['Real Estate', 'Investment', 'Architecture', 'Social Media']
  },
  {
    slug: 'marketing-power-educational',
    title: 'Strategic Marketing – The Power of Brand Growth Series',
    title_ar: 'أهمية التسويق – سلسلة توعوية لنمو العلامات التجارية',
    description: 'Educational social media carousel and infographic content explaining market positioning, consumer psychology, and the ROI of strategic design.',
    description_ar: 'سلسلة منشورات تعليمية وتوعوية تشرح أهمية التسويق الرقمي وبناء الوعي بالعلامة التجارية وقوة التصميم في مضاعفة المبيعات.',
    date: '2026-03-19',
    cover: '/images/scocial-media-designs/أهمية التسويق.jpeg',
    gallery: [
      '/images/scocial-media-designs/أهمية التسويق.jpeg'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Growth Agency',
    client_ar: 'وكالة النمو التسويقي',
    featured: true,
    tags: ['Marketing', 'Infographic', 'Educational', 'Branding Strategy']
  },
  {
    slug: 'berni-biyad-fmcg-beverages',
    title: 'Berni & Biyad – FMCG Product & Beverage Visual Ads',
    title_ar: 'بيرني وبياض – إعلانات وبوستات منتجات المشروبات الطبيعية',
    description: 'Vibrant, refreshing product photography and 3D visual ads highlighting natural beverage packaging, fruity freshness, and energetic social mockups.',
    description_ar: 'تصاميم إعلانية بصرية منعشة ومفعمة بالحيوية لمنتجات العصائر والمشروبات الطبيعية مع إبراز عبوات المنتج والنكهات الغنية.',
    date: '2026-03-18',
    cover: '/images/scocial-media-designs/product-berni.jpg',
    gallery: [
      '/images/scocial-media-designs/product-berni.jpg',
      '/images/scocial-media-designs/product-biyad.jpg'
    ],
    category: 'Social Media Design',
    category_ar: 'تصميم سوشيال ميديا',
    client: 'Berni & Biyad Beverages',
    client_ar: 'مشروبات بيرني وبياض',
    featured: true,
    tags: ['FMCG', 'Packaging', 'Product Ad', 'Beverages', '3D Visuals']
  }
];

for (const p of projects) {
  const mdPath = path.join('src/content/projects', `${p.slug}.md`);
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
  console.log(`Updated/Created: ${mdPath}`);
}
console.log('All social media projects successfully written!');
