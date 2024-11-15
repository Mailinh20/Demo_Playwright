import { test, expect } from "@playwright/test";

const urlPage = "" // Page test

test("createOP", async ({page}) => { 

  await page.goto(urlPage);

  await page.locator('//input[@placeholder="Username"]').fill(""); // UserName
  await page.locator('//input[@placeholder="Password"]').fill(""); // Password
  await page.getByRole('button', {name:"Sign in"}).click();
  await page.waitForNavigation();
  await page.getByRole('button', {name:"Layouts"}).click();
  await page.locator('//a[normalize-space()="new_base > layout_2"]').click();

  await expect(page).toHaveURL(/.*floor/);

  await page.locator('#floor').click();
  await page.locator('//div[@class="css-1hwfws3 react-select__value-container react-select__value-container--is-multi"]').click();
  await page.locator('//div[@class="react-select__input"]//input').fill("001");
  await page.locator('//div[@class="css-1hwfws3 react-select__value-container react-select__value-container--is-multi"]').press('Enter');
  await page.locator('//div[@class="css-1hwfws3 react-select-operator__value-container react-select-operator__value-container--is-multi"]').click();
  
  await page.getByText("",{exact:true}).click(); // Operator name 
  await page.getByRole('button', {name:"OK"}).click();
  await page.getByRole('button', {name:"Save"}).click();

  await page.waitForSelector('//div[text()="To save layout was successful"]');
});

test("upload file", async ({page}) => { 
  await page.goto(urlPage);

  await page.locator('//input[@placeholder="Username"]').fill(""); // UserName
  await page.locator('//input[@placeholder="Password"]').fill(""); // Password
  await page.getByRole('button', {name:"Sign in"}).click();

  await page.waitForNavigation();

  await page.getByRole('button', {name:"Layouts"}).click();
  await page.locator('//a[normalize-space()="new_base > layout_2"]').click();
  await page.locator('(//button[@type="button"])[7]').click(); 

  const fileChooserPromise = page.waitForEvent('filechooser');

  await page.getByRole('button', { name: 'browse' }).click();

  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('C:/Users/nmailinh/Pictures/Capture.PNG');

  await page.getByLabel('Upload 1 file').click();
  await page.waitForTimeout(10000);
});

test("edit group", async ({page}) => { 
  await page.goto(urlPage);
  await page.locator('//input[@placeholder="Username"]').fill("");// UserName
  await page.locator('//input[@placeholder="Password"]').fill("");// Password
  await page.getByRole('button', {name:"Sign in"}).click();
  await page.waitForNavigation();
  await page.locator('//div[@data-tooltip="Groups List"]//i[@fill="currentColor"]//*[name()="svg"]').click();
  const title = 'TMA'
  await page.locator(`.table-list-body tr:has(td:has-text("${title}"))`).locator('button:has-text("Edit")').first().click();

  await page.locator('//input[@name="groupName"]').fill('TMA_group');
  await page.locator('//label[normalize-space()="Disabled"]').click();
  await page.getByRole('button', {name:"Update"}).click();
  const groupName = page.locator('//td[normalize-space()="TMA_group"]');
  await expect(groupName).toBeVisible();
});
