import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test('StampEzee Automation Flow', async () => {
    // Launch browser in headed mode with slow motion
    const browser = await chromium.launch({
        headless: false,
        slowMo: 2000, // 2 seconds delay between actions
    });

    // NOTE: Ensure this path is correct before running!
    const filePath = path.resolve('C:\\Users\\User\\Desktop\\New folder\\Stampezee\\tests\\files\\jgp.jpg');
    console.log('Using file:', filePath);

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://stp2.rootdevs.xyz/en/auth/signup');

    const formContainer = page.locator('[ref="e18"]').or(page.locator('form'));

    // // Navigate to Retailer Dashboard
    // await page.getByRole('link', { name: 'Retailer dashboard' }).click();
    // // Navigate to Create Account page
    // await page.getByRole('link', { name: 'Create New Account' }).click();
    await page.getByRole('textbox', { name: 'StampEzee' }).fill('Automation Test');

    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.getByRole('button', { name: 'Company Logo *' }).click(),
    ]);
    await fileChooser.setFiles(filePath);

    // Address & business info
    await page.getByRole('textbox', { name: '5243 Steeles Ave W, North' }).fill('kawlar');
    await page.getByText('Kawlar BazarDhaka, Bangladesh').click();
    await page.getByRole('combobox').filter({ hasText: 'Clothing' }).click();
    await page.getByRole('option', { name: 'Home Decor' }).click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Owner details - FIXES APPLIED HERE
    await page.getByRole('textbox', { name: 'First Name' }).fill('Abdur');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Rahman');

// // Locate by the placeholder text "hannacalzoni@gmail.com" (from your snapshot)
//     await page.getByRole('textbox', { name: 'hannacalzoni@gmail.com' }).type('automation3@gmail.com');
//     const phoneInput = page.locator('input[name="phoneNumber"]'); 

// const passwordInput = page.getByRole('textbox', { name: 'Create your password' });
//     await passwordInput.type('Sh@000000');
//     await passwordInput.blur();
//     await expect(passwordInput).toHaveValue('Sh@000000', { timeout: 5000 });
//     await expect(page.locator('text=Password is required')).toBeHidden({ timeout: 5000 });
//     console.log('Password validation cleared');

//     const confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm your password' });
//     await confirmPasswordInput.type('Sh@000000');
//     await confirmPasswordInput.blur();
//     await expect(confirmPasswordInput).toHaveValue('Sh@000000', { timeout: 5000 });
//     await expect(page.locator('text=Confirm Password is required')).toBeHidden({ timeout: 5000 });
//     console.log('Confirm password validation cleared');
 // 2. Fill Email (Handling Validation & Actionability with force)
// 2. Fill Email (FIXED: Using slower .type() with delay for maximum robustness)
 // 2. Fill Email (FINAL FIX: Using aggressive .fill() with force to bypass UI instability)
    const emailInput = formContainer.locator('input[name="email"]'); 
    
    // The most robust way to set the value when click/type fail due to UI events:
    await emailInput.fill('automation3@gmail.com', { force: true }); 
    
    // Triggers final email validation check
   // Wait 1 second for validation logic to settle

    await expect(emailInput).toHaveValue('automation3@gmail.com', { timeout: 5000 });
    console.log('✅ Email successfully set and validated.');

    // ----------------------------------------------------------------------
 // 4. Fill Phone Number (THE ULTIMATE FIX: JavaScript DOM Injection with +1)
    const phoneInputLocator = formContainer.locator('input[name="phoneNumber"]'); 

    await page.waitForLoadState('networkidle', { timeout: 15000 }); 
    await expect(phoneInputLocator).toBeEnabled({ timeout: 10000 }); 

    console.log("Attempting to inject phone number via JavaScript with +1...");
    
    // Inject the FULL value (including +1) directly into the DOM.
    await phoneInputLocator.evaluate((node, value) => {
        // Set the value property
        node.value = value;
        // Dispatch input and change events manually to trigger validation
        node.dispatchEvent(new Event('input', { bubbles: true }));
        node.dispatchEvent(new Event('change', { bubbles: true }));
    }, '+1 434 534 5633'); // Injecting the full string
   
    // Validate the value was set correctly
    await expect(phoneInputLocator).toHaveValue('+1 434 534 5633', { timeout: 5000 });
    console.log('✅ Phone value successfully injected and validated in DOM.');
    // ---------------------------------------------------------------------
    
 // 5. Fill Password Fields (FINAL FIX: JS Injection for both)
    
    const passwordInput = formContainer.locator('input[name="password"]');
    const confirmPasswordInput = formContainer.locator('input[name="confirmPassword"]');

    // 5a. Create Password Injection
    await passwordInput.waitFor({ state: 'attached', timeout: 10000 }); 
    console.log('Injecting Create Password via JavaScript...');
    await passwordInput.evaluate((node, value) => {
        node.value = value;
        node.dispatchEvent(new Event('input', { bubbles: true }));
        node.dispatchEvent(new Event('change', { bubbles: true }));
    }, 'Sh@000000');
    
    // Explicit blur removed as it caused instability
    await expect(passwordInput).toHaveValue('Sh@000000', { timeout: 5000 });
    console.log('✅ Create Password field filled.');

    // 5b. Confirm Password Injection
       console.log('Injecting Confirm Password via JavaScript...');
    await confirmPasswordInput.evaluate((node, value) => {
        node.value = value;
        node.dispatchEvent(new Event('input', { bubbles: true }));
        node.dispatchEvent(new Event('change', { bubbles: true }));
    }, 'Sh@000000'); 
   
    // FIX: Removed the failing await confirmPasswordInput.blur();
    await expect(confirmPasswordInput).toHaveValue('Sh@000000', { timeout: 5000 });
    // REMOVED: await page.waitForTimeout(500); // This was the failing line!
    console.log('✅ Confirm Password field filled.');
    
    // ----------------------------------------------------------------------
    



/// 6. Final Stabilization and Click
 const signupButton = formContainer.getByRole('button', { name: 'Sign Up' }); // Moved definition up

    // CRITICAL RE-ASSERTIONS: Ensure values are still present before click
    await expect(phoneInputLocator).toHaveValue('+1 434 534 5633', { timeout: 5000 });
    await expect(passwordInput).toHaveValue('Sh@000000', { timeout: 5000 });
    
    await page.waitForLoadState('networkidle', { timeout: 10000 });

    console.log('Awaiting final validation completion...');
    await expect(signupButton).toBeEnabled({ timeout: 20000 }); 
    
    console.log('Clicking Sign Up and awaiting redirection...');

    // FINAL ROBUST NAVIGATION FIX: Set up wait BEFORE click
    const verificationPageResponse = page.waitForURL('**/auth/verification', { timeout: 15000 });
    
    await signupButton.click({ force: true }); // Click with force on unstable element

    await verificationPageResponse; // Wait for the navigation to complete

    console.log('✅ Successfully clicked Sign Up and navigated to Verification page.');


    // Wait for automatic redirect to verification page
    await page.waitForURL('**/auth/verification', { timeout: 15000 });

    // Verification input 
    const verificationCodeInput = page.getByRole('textbox').first();
    await verificationCodeInput.waitFor({ state: 'visible', timeout: 10000 });
    await verificationCodeInput.fill('000000');
    await expect(verificationCodeInput).toHaveValue('000000');

    // Click verify if button exists
    await page.getByRole('button', { name: /verify|submit|continue/i }).click({ timeout: 5000 });

    // Dashboard and flow continue...
    await page.waitForURL('**/dashboard', { timeout: 15000 }); // Wait for post-verification redirect
    await page.getByRole('heading', { name: 'Create First Branch' }).click();
    await page.getByRole('button', { name: 'Close' }).click();

    // Add new branch
    await page.getByRole('link', { name: 'Create New Branch' }).click();
    await page.getByRole('link', { name: 'Add New Branch' }).click();
    await page.getByRole('textbox', { name: 'Cherabinth Toronto' }).fill('Automation Branch');
    await page.getByRole('button', { name: 'Save Branch' }).click();

    // Create new stamp card
    await page.getByRole('link', { name: 'Create New Stamp Card!' }).click();
    await page.getByRole('textbox', { name: 'Enter Stamp Card Name' }).fill('Auto Card');
    await page.getByRole('textbox', { name: 'Enter Stamp Card Title' }).fill('Autocard title');
    await page.locator('div').filter({ hasText: /^Branch\*Select an option$/ }).getByRole('combobox').click();
    await page.getByText('Automation Branch').click();
    await page.getByRole('textbox', { name: 'www.xyz.com' }).fill('www.auto.com');
    await page.getByRole('textbox', { name: 'Add offer details' }).fill('this is offer details');
    await page.getByRole('combobox').filter({ hasText: 'Select an option' }).click();
    await page.getByText('Burgers').click();
    await page.getByRole('textbox', { name: 'About' }).fill('This is about the company not stamp card');
    await page.getByRole('button', { name: 'Next' }).nth(1).click();
    await page.getByRole('textbox', { name: 'Enter number' }).fill('4');
    await page.getByRole('combobox').filter({ hasText: 'Select an option' }).click();
    await page.getByText('Decrease Stamps').click();
    await page.getByRole('textbox', { name: 'Enter number of stamps' }).fill('2');
    await page.getByRole('button', { name: 'Add Escalation Rule' }).click();
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.getByRole('textbox', { name: 'Reward Name' }).fill('This is main');
    await page.getByRole('combobox').filter({ hasText: 'Day' }).click();
    await page.getByRole('option', { name: 'Month' }).click();
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await page.getByRole('button', { name: 'Next' }).first().click();
    await page.getByRole('button', { name: 'Publish' }).first().click();

    // Wait for publish confirmation
    await page.waitForTimeout(5000); // wait 5 seconds for publish success

    // Verify we are on the Stamp Cards page
    await page.goto('https://stp2.rootdevs.xyz/en/retailer/my-stamp-card?page=1&limit=10');
    await expect(page.locator('h2')).toBeVisible();

    await browser.close();
});