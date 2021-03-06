const Page = require('./helpers/page');
let page;
beforeEach(async ()=> {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
})

test('The header has the correct test', async () => {
  const text = await page.getContentsOf('a.brand-logo');
  expect(text).toEqual('Blogster');
});
test('clicking login will start oauth flow', async () => {
  await page.click('.right a');
  const url = page.url();
  expect(url).toMatch(/accounts\.google\.com/);
})

test('When sign in shows logout button', async () => {
  await page.login()
  const text = await page.getContentsOf('a[href="/auth/logout"]');
  expect(text).toEqual('Logout')
})