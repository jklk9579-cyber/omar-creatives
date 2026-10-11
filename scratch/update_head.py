import re

with open('src/components/BaseHead.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove import FallbackImage
content = re.sub(r'import\s+FallbackImage\s+from\s+["\'][^"\']+["\'];\s*', '', content)

# Replace image = FallbackImage
content = re.sub(r'image\s*=\s*FallbackImage', 'image = "/images/og-image.jpg"', content)

# Replace ogImageUrl resolution
old_url_pattern = r'const\s+ogImageUrl\s*=\s*typeof\s+image\s*===\s*["\']string["\']\s*\?\s*new\s+URL\(image,\s*Astro\.url\)\.href\s*:\s*new\s+URL\(image\.src,\s*Astro\.url\)\.href;'
new_url_code = '''const siteBase = Astro.site || new URL("https://omarcreatives.com");
const ogImageUrl =
  typeof image === "string"
    ? new URL(image, siteBase).href
    : new URL(image.src, siteBase).href;'''

content = re.sub(old_url_pattern, new_url_code, content)

# Replace OG tags
old_og = '''<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={Astro.url} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageUrl} />'''

new_og = '''<!-- Open Graph / Facebook / WhatsApp -->
<meta property="og:site_name" content="Omar Creatives" />
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageUrl} />
<meta property="og:image:secure_url" content={ogImageUrl} />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Omar Creatives | Creative Developer & AI Specialist" />'''

content = content.replace(old_og, new_og)

with open('src/components/BaseHead.astro', 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS")
