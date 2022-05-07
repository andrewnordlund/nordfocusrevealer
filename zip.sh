rm nordFocusReveal.xpi
zip -r nordFocusReveal.xpi manifest.json nordFocusReveal-bg.js LICENSE libs content_scripts icons options_pages -x *.swp *.DS_Store "*~"
