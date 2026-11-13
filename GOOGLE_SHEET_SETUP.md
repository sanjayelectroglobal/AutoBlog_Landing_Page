# 📊 AutoBlog Google Sheet & Contact Automation Setup

This guide shows you how to connect your Google Sheet to the AutoBlog contact form in **60 seconds**.

---

## Step 1: Create or Open Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new sheet (e.g. named **"AutoBlog Contact Inquiries"**).
2. In **Row 1**, set these column headers:
   * **A1:** `Timestamp`
   * **B1:** `Name`
   * **C1:** `Email`
   * **D1:** `Mobile`
   * **E1:** `Website / Store URL`
   * **F1:** `Message`
   * **G1:** `Source`

---

## Step 2: Add the Google Apps Script Webhook

1. In your Google Sheet top menu, click **Extensions** → **Apps Script**.
2. Delete any default code in `Code.gs` and paste this script:

```javascript
/**
 * AutoBlog Contact Form Webhook
 * Appends contact form submissions directly into this Google Sheet.
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Format mobile as text so Google Sheets doesn't parse '+' as a formula (#ERROR!)
    var mobileVal = String(data.mobile || '').trim();
    if (mobileVal.indexOf('+') === 0 || mobileVal.indexOf('=') === 0) {
      mobileVal = "'" + mobileVal;
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      mobileVal,
      data.website || '',
      data.message || '',
      data.source || 'AutoBlog Contact Form'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Row added" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **Save** (💾) icon at the top.

---

## Step 3: Deploy as a Web App

1. In the top-right corner of Apps Script, click **Deploy** → **New deployment**.
2. Click the gear icon (⚙️) next to "Select type" and select **Web app**.
3. Fill in the fields:
   * **Description:** `AutoBlog Contact Form Webhook`
   * **Execute as:** `Me (your email)`
   * **Who has access:** `Anyone` *(Crucial: must be "Anyone" so the website can post new leads)*
4. Click **Deploy**.
5. If Google asks for authorization:
   * Click **Authorize access**
   * Choose your Google account
   * Click **Advanced** (bottom left) → **Go to Untitled project (unsafe)** → **Allow**
6. Copy the **Web App URL** shown (it looks like `https://script.google.com/macros/s/.../exec`).

---

## Step 4: Add the URL to AutoBlog `.env.local`

Open `.env.local` in the project root and paste your Web App URL into:

```env
GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

Save the file. **You're done!**

---

### What Happens Automatically When Someone Submits the Contact Form:
1. **Google Sheet**: A new row is immediately appended with timestamp, name, email, mobile, store URL, message, and source.
2. **MailX Auto-Reply**: The submitter automatically receives a branded confirmation email from `sales@notify.mommantum.com`.
3. **CC Delivery**: `kuldeep@mommantum.com` and `sharnasaurabh2604@gmail.com` are CC'd on the email.
4. **Google Calendar Link**: A 1-click meeting link is provided for the next 4 business days (10:00 AM – 6:00 PM IST) with participants:
   * `ahirkuldeep1709@gmail.com`
   * `sharnasaurabh2604@gmail.com`
5. **Direct Connect**: Direct support emails for urgent queries are included both in the email body and on the website confirmation screen.
