package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.testng.annotations.*;
import static org.testng.Assert.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;

public class PostTest10 {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @BeforeClass(alwaysRun = true)
  public void setUp() throws Exception {
    System.setProperty("webdriver.ie.driver", "D:\\BrowserDriver\\IEDriverServer.exe");
    driver = new InternetExplorerDriver();
    baseUrl = "https://www.katalon.com/";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @Test
  public void testPostTest10() throws Exception {
    driver.get("http://www.ecnu-joyin.top/timeline-frontend/");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Timeline'])[2]/following::img[2]")).click();
    driver.findElement(By.id("bt-upload-img")).click();
    driver.findElement(By.id("bt-upload-img")).clear();
    driver.findElement(By.id("bt-upload-img")).sendKeys("C:\\fakepath\\Testbig7.jpeg");
    driver.findElement(By.id("bt-upload-img")).click();
    driver.findElement(By.id("bt-upload-img")).clear();
    driver.findElement(By.id("bt-upload-img")).sendKeys("C:\\fakepath\\Testbig5.jpg");
  }

  @AfterClass(alwaysRun = true)
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch (NoAlertPresentException e) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if (acceptNextAlert) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }
}
