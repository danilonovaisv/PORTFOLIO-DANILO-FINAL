const fs = require('fs');

let content = fs.readFileSync('src/config/site-assets.ts', 'utf8');

// Replace logos
content = content.replace("'global.logo_header_light'", "'global.logos.global.logo_header_light'");
content = content.replace("'global.logo_header_dark'", "'global.logos.global.logo_header_dark'");
content = content.replace("'global.favicon_light'", "'global.logos.global.favicon_light'");
content = content.replace("'global.favicon_dark'", "'global.logos.global.favicon_dark'");

// Replace fonts
content = content.replace("'global.font_display'", "'global.fonts.global.font_display'");
content = content.replace("'global.font_h1'", "'global.fonts.global.font_h1'");
content = content.replace("'global.font_h2'", "'global.fonts.global.font_h2'");
content = content.replace("'global.font_h3'", "'global.fonts.global.font_h3'");
content = content.replace("'global.font_body'", "'global.fonts.global.font_body'");
content = content.replace("'global.font_light'", "'global.fonts.global.font_light'");

// Replace heroVideos home
content = content.replace("'home.manifesto_video'", "'home.video.manifesto.desk'");
content = content.replace("'home.manifesto_video_mobile'", "'home.video.manifesto.mobile'");

// Replace about hero
content = content.replace("'about.hero.desktop_video.mp4'", "'about.hero.about.hero.desktop_video'");
content = content.replace("'about.hero.mobile_video.mp4'", "'about.hero.about.hero.mobile_video'");

// Replace portfolio hero
content = content.replace("'portfolio.hero_desktop_video'", "'portfolio.hero.portfolio.hero_desktop_video'");
content = content.replace("'portfolio.hero_mobile_video'", "'portfolio.hero.portfolio.hero_mobile_video'");

// Replace about method (There is one in heroVideos and two in about section)
// We'll replace all 'about.method_video' with 'about.method.about.method.desktop_video' first,
// but wait, let's just do it directly.
content = content.split('\n').map(line => {
  if (line.includes("method:") && line.includes("'about.method_video'")) {
    return line.replace("'about.method_video'", "'about.method.about.method.desktop_video'");
  }
  if (line.includes("methodDesktop:") && line.includes("'about.method_video'")) {
    return line.replace("'about.method_video'", "'about.method.about.method.desktop_video'");
  }
  if (line.includes("methodMobile:") && line.includes("'about.method_video'")) {
    return line.replace("'about.method_video'", "'about.method.about.method.mobile_video'");
  }
  return line;
}).join('\n');

// Replace originImages
content = content.replace("'about.origin_image.1'", "'about.origin.about.origin_image.1'");
content = content.replace("'about.origin_image.2'", "'about.origin.about.origin_image.2'");
content = content.replace("'about.origin_image.3'", "'about.origin.about.origin_image.3'");
content = content.replace("'about.origin_image.4'", "'about.origin.about.origin_image.4'");

// Replace beliefs ghostModel
content = content.replace("'about.beliefs.ghost-transformed'", "'about.beliefs.ghost'");

// Replace closing videos
content = content.replace("'about.closing_video'", "'about.Closing.video.closing.desk'");
content = content.replace("'about.closing_video_mobile'", "'about.Closing.video.closing.mobile'");

fs.writeFileSync('src/config/site-assets.ts', content);
console.log('Fixed src/config/site-assets.ts');
