package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class 21A {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @Before
  public void setUp() throws Exception {
    driver = new FirefoxDriver();
    baseUrl = "https://www.katalon.com/";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @Test
  public void test21A() throws Exception {
    driver.get("http://www.ecnu-joyin.top/timeline-frontend/");
    driver.findElement(By.id("log-status")).click();
    driver.findElement(By.linkText("去注册")).click();
    driver.findElement(By.id("register-username")).click();
    driver.findElement(By.id("register-username")).clear();
    driver.findElement(By.id("register-username")).sendKeys("tester");
    driver.findElement(By.id("register-pwd")).click();
    driver.findElement(By.id("register-pwd")).clear();
    driver.findElement(By.id("register-pwd")).sendKeys("123456h");
    driver.findElement(By.id("register-confirm-pwd")).click();
    driver.findElement(By.id("register-confirm-pwd")).clear();
    driver.findElement(By.id("register-confirm-pwd")).sendKeys("123456h");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='确认密码：'])[1]/following::input[1]")).click();
    assertEquals("注册成功！", closeAlertAndGetItsText());
  }

  @After
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
