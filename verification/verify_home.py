from playwright.sync_api import sync_playwright

def verify_home():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navegando...")
            page.goto("http://localhost:3000")

            # Wait for preloader text
            try:
                page.wait_for_selector("text=SUMMONING SPIRITS", timeout=5000)
                print("Preloader encontrado (SUMMONING SPIRITS)")
            except:
                print("Preloader não encontrado ou já passou")

            # Wait for preloader to finish (2s) + Entrance animations (3s) + Buffer
            print("Aguardando animações de entrada (6s)...")
            page.wait_for_timeout(6000)

            # Tirar screenshot
            page.screenshot(path="verification/home_hero_final.png", full_page=True)
            print("Screenshot salvo em verification/home_hero_final.png")

        except Exception as e:
            print(f"Erro Geral: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_home()
