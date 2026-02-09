#!/bin/bash
# Image Optimization Script for Southern Arizona Marketing Systems
# This script converts PNG/JPG images to WebP format for better performance

echo "🖼️  Image Optimization Script"
echo "=============================="
echo ""

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "⚠️  cwebp is not installed. Installing..."
    echo "Run: sudo apt-get update && sudo apt-get install -y webp"
    echo ""
    echo "Or use online tools:"
    echo "  - https://squoosh.app/ (Google's tool)"
    echo "  - https://tinypng.com/"
    echo "  - https://cloudconvert.com/png-to-webp"
    exit 1
fi

# Navigate to images directory
cd "$(dirname "$0")/images" || exit 1

echo "Converting images to WebP format..."
echo ""

# Convert PNG files to WebP
for img in *.PNG *.png 2>/dev/null; do
    if [ -f "$img" ]; then
        filename="${img%.*}"
        echo "Converting: $img → ${filename}.webp"
        cwebp -q 85 "$img" -o "${filename}.webp"
        
        # Show file size comparison
        original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img")
        webp_size=$(stat -f%z "${filename}.webp" 2>/dev/null || stat -c%s "${filename}.webp")
        reduction=$((100 - (webp_size * 100 / original_size)))
        echo "  ✓ Size reduction: ${reduction}%"
        echo ""
    fi
done

# Convert JPG files to WebP
for img in *.JPG *.jpg *.JPEG *.jpeg 2>/dev/null; do
    if [ -f "$img" ]; then
        filename="${img%.*}"
        echo "Converting: $img → ${filename}.webp"
        cwebp -q 85 "$img" -o "${filename}.webp"
        
        # Show file size comparison
        original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img")
        webp_size=$(stat -f%z "${filename}.webp" 2>/dev/null || stat -c%s "${filename}.webp")
        reduction=$((100 - (webp_size * 100 / original_size)))
        echo "  ✓ Size reduction: ${reduction}%"
        echo ""
    fi
done

echo "✅ Image optimization complete!"
echo ""
echo "Next steps:"
echo "1. Update HTML to use <picture> elements with WebP fallbacks"
echo "2. Test images in different browsers"
echo "3. Consider serving images through a CDN (Cloudflare)"
