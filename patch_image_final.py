from PIL import Image

def patch_image(image_path):
    try:
        img = Image.open(image_path)
        width, height = img.size
        print(f"Image size: {width}x{height}")

        # Define watermark area (bottom right corner)
        # Based on previous success, let's target the last 5-10% of width/height
        # Watermark/Sparkle is in the very corner.
        
        # Patch dimensions
        wm_width = 80
        wm_height = 80
        
        # Position of watermark (bottom right)
        wm_x = width - wm_width
        wm_y = height - wm_height
        
        # Source area to copy for patching (just to the left of watermark)
        # Copy from (x - wm_width, y)
        src_x = wm_x - wm_width - 10 
        src_y = wm_y
        
        box = (src_x, src_y, src_x + wm_width, src_y + wm_height)
        region = img.crop(box)
        
        # Paste over watermark
        img.paste(region, (wm_x, wm_y))
        
        img.save(image_path)
        print(f"Successfully patched {image_path}")
        
    except Exception as e:
        print(f"Error patching image: {e}")

if __name__ == "__main__":
    patch_image("public/hero-user-final.png")
