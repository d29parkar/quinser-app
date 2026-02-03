# Quinser Pharmaceuticals -- Admin User Manual

This guide is for company directors and administrators who need to manage the Quinser Pharmaceuticals website. No technical knowledge is required.

---

## What Is This Website?

The Quinser Pharmaceuticals website (https://quinser.vercel.app) is the company's online presence. It shows visitors information about the company, its team, manufacturing capabilities, and product catalogue. Visitors can also send enquiries through a contact form.

As an admin, you can:

- **Add, edit, and delete products** that appear on the public Products page
- **Read messages** submitted through the Contact page
- **View dashboard statistics** (total products, total messages, unread messages)

All changes you make are saved instantly and are visible to website visitors immediately.

---

## How to Log In

1. Open your web browser (Chrome, Firefox, Safari, or Edge)
2. Go to: **https://quinser.vercel.app/admin/login**
   - You can also reach this by scrolling to the bottom of any page on the website and clicking the small "Admin Login" link
3. Enter your **Username** and **Password**
4. Click **Sign In**
5. You will be taken to the Admin Dashboard

### Login credentials

- **Username:** admin
- **Password:** quinser2025

### If you cannot log in

- Make sure you are typing the username and password exactly as shown (they are case-sensitive)
- Check that Caps Lock is not turned on
- If the page takes a long time to load (more than 30 seconds), the server may be waking up -- this is normal, please wait and try again
- There is no "forgot password" feature -- contact the developer if you need your password reset

---

## The Admin Dashboard

After logging in, you will see the Dashboard. It shows three cards at the top:

| Card | What it means |
|---|---|
| **Total Products** | The number of products currently listed on the website |
| **Total Messages** | The total number of messages received through the Contact form |
| **Unread Messages** | Messages you have not yet opened |

Below the cards, there are two quick-action buttons:

- **Manage Products** -- takes you to the product management page
- **View Messages** -- takes you to the contact submissions page (shows a count of new messages if any)

### Navigation

- The **Quinser logo** and "Admin Panel" text appear at the top of every admin page
- **View Website** (top right) -- opens the public website in a new tab so you can see how it looks to visitors
- **Logout** (top right, red button) -- logs you out and returns you to the login page
- On the Products and Submissions pages, a **"Back to Dashboard"** link at the top takes you back to the main dashboard

---

## Managing Products

### Viewing all products

1. From the Dashboard, click **Manage Products**
2. You will see a table listing all products with columns: Name, Category, Dosage Form, Description, and Actions

### Adding a new product

1. Click the **"+ Add Product"** button (top right of the Products page)
2. A form window will appear with the following fields:
   - **Product Name** (required) -- The name of the product as it will appear on the website
   - **Category** (required) -- Select from the dropdown list:
     - Gynaec / Infertility
     - Surg / Uro
     - Phy / Nephro / Cardio
     - Orthopedics
     - Gastroenterology
   - **Dosage Form** (optional) -- e.g., "Tablet", "Capsule", "Syrup", "Injection"
   - **Description** (optional) -- A short description of the product
3. Fill in the required fields
4. Click **Add Product**
5. The product will appear in the table and will be immediately visible on the public Products page

### Editing a product

1. Find the product you want to edit in the table
2. Click the **Edit** button (blue) on that row
3. The form window will appear with the current product details pre-filled
4. Change the fields you want to update
5. Click **Update**
6. The changes will take effect immediately on the public website

### Deleting a product

1. Find the product you want to delete in the table
2. Click the **Delete** button (red) on that row
3. A confirmation message will appear asking "Are you sure you want to delete this product?"
4. Click **OK** to confirm, or **Cancel** to go back

**Warning: Deletion is permanent.** Once you delete a product, it cannot be recovered. The product will immediately disappear from the public website.

### Common mistakes when managing products

| Mistake | How to avoid it |
|---|---|
| Forgetting to select a category | The category field is required -- the form will not submit without it |
| Typing the product name wrong | Double-check the product name before submitting -- it appears exactly as you type it |
| Creating duplicate products | Before adding a new product, scroll through the existing list to make sure it does not already exist |
| Deleting the wrong product | Always read the product name carefully before confirming deletion |

---

## Viewing Contact Form Submissions

When someone fills out the Contact form on the website, their message is saved and appears in the admin panel for you to review.

### Viewing messages

1. From the Dashboard, click **View Messages**
2. The left side shows a list of all messages, with the newest at the top
3. Unread messages are highlighted with a blue dot next to the sender's name
4. Click on any message in the list to read it

### Reading a message

1. Click on a message in the left-side list
2. The full message will appear on the right side, showing:
   - **From** -- the sender's name
   - **Email** -- the sender's email address (clickable)
   - **Phone** -- the sender's phone number (if provided)
   - **Received** -- the date and time the message was sent
   - **Message** -- the full message text
3. The message will automatically be marked as "read" (the blue dot will disappear)

### Replying to a message

1. Open the message you want to reply to
2. Click **Reply via Email** -- this will open your email app with a pre-filled reply to the sender
3. If the sender included a phone number, you can also click **Call** to call them directly

### Deleting a message

1. Open the message you want to delete
2. Click the **Delete** button (top right of the message view)
3. Confirm the deletion when prompted

**Warning: Deletion is permanent.** Once you delete a message, it cannot be recovered.

---

## Admin Safety Checklist

Before making changes, keep these points in mind:

1. **Confirm before deleting** -- Always read the confirmation prompt carefully. Deletions cannot be undone.
2. **Keep product names consistent** -- Use the same naming format for all products (e.g., always capitalize the first letter of each word).
3. **Select the correct category** -- Products are grouped by category on the public website. Using the wrong category means visitors may not find the product.
4. **Do not share your login credentials** -- If another director needs access, contact the developer to create a separate account.
5. **Log out when finished** -- Especially on shared computers, always click the Logout button when you are done.

---

## Frequently Asked Questions

### "The page is not loading" or "The page is very slow"

The website's backend server goes to sleep when nobody is using it (to save costs on the free hosting plan). When you visit after a period of inactivity, it takes about 30 seconds to wake up. **Wait and refresh the page** -- it should load normally after the first time.

### "I made changes but they are not showing on the website"

Changes should appear immediately. Try these steps:
1. Open the public website in a new tab
2. Press **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac) to do a hard refresh, which clears your browser's cache
3. If the products still look the same, make sure your changes were saved -- go back to the admin Products page and verify the product appears in the table with the updated information

### "I cannot log in"

1. Make sure you are using the correct address: **https://quinser.vercel.app/admin/login**
2. Check that the username and password are typed correctly (they are case-sensitive)
3. If the login page itself is slow to load, the server may be waking up -- wait 30 seconds and try again
4. If you see an error message after clicking Sign In, the password may be wrong. Try typing it again carefully.
5. If nothing works, contact the developer

### "I accidentally deleted a product / message"

Unfortunately, deletions are permanent. The product or message cannot be recovered. You will need to re-create the product manually using the "Add Product" button.

### "The website looks different on my phone"

The website is designed to work on all screen sizes (phones, tablets, and computers). The layout may look slightly different on smaller screens -- this is normal. The admin panel is best used on a computer or tablet for easier navigation.

### "I see 'Failed to fetch products' on the Products page"

This usually means the backend server is still waking up. Wait about 30 seconds and refresh the page. If the problem persists after several refreshes, contact the developer.

---

## Quick Reference

| Task | Where to go |
|---|---|
| Log in to admin | https://quinser.vercel.app/admin/login |
| View the dashboard | https://quinser.vercel.app/admin |
| Manage products | https://quinser.vercel.app/admin/products |
| View messages | https://quinser.vercel.app/admin/submissions |
| View the public website | https://quinser.vercel.app |
| Log out | Click the red "Logout" button in the top right corner |
