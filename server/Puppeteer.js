const puppeteer = require("puppeteer");

const ScrapData = async (companyName) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(`https://www.linkedin.com/company/${companyName}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await page.waitForSelector(".modal__dismiss");
    await page.click(".modal__dismiss");
    await new Promise((resolve) => setTimeout(resolve, 300));
    const sectionContent = await page.evaluate(() => {
      const sectionElement = document.querySelector(".core-section-container");
      const dlElements = document.querySelectorAll(".mt-6");

      const sectionData = {
        Title:document.querySelector(".top-card-layout__title").textContent,
        AboutUs: sectionElement
          .querySelector(".core-section-container__content p")
          .textContent.trim(),
        ImgSrc: document
          .querySelector(".top-card-layout__entity-image")
          .getAttribute("src"),
          

      };
      dlElements.forEach((dl) => {
        const dtElements = dl.querySelectorAll("dt");
        const ddElements = dl.querySelectorAll("dd");

        dtElements.forEach((dt, index) => {
          const key = dt.textContent.trim();
          const value = ddElements[index].textContent.trim();
          sectionData[key] = value;
        });
      });
      return sectionData;
    });
    return sectionContent;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await browser.close();
  }
};

module.exports = ScrapData;
