import { PrismaClient, AssetFormat, AssetStatus, Illumination, ContractStatus, PreferredChannel } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Smart Media database...");

  // ─── 1. Admin users ───────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("SmartMedia@2025", 12);

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@smartmedia.com.np" },
    update: {},
    create: {
      name: "Anil Shrestha",
      email: "admin@smartmedia.com.np",
      passwordHash,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: "manager@smartmedia.com.np" },
    update: {},
    create: {
      name: "Suraj Tamang",
      email: "manager@smartmedia.com.np",
      passwordHash,
      role: "MANAGER",
      isActive: true,
    },
  });

  console.log("✅ Users created:", superAdmin.email, manager.email);

  // ─── 2. Assets (real Nepali locations) ────────────────────────────────────
  const assets = await Promise.all([
    prisma.asset.upsert({
      where: { code: "TIA-INT-ARR-001" },
      update: {},
      create: {
        name: "TIA International Arrival – Main LED Screen",
        code: "TIA-INT-ARR-001",
        description: "55-inch LED display in the baggage claim area of the International Arrival terminal. Maximum dwell time.",
        address: "Tribhuvan International Airport, International Terminal",
        city: "Kathmandu",
        district: "Bagmati",
        lat: 27.6966,
        lng: 85.3591,
        format: AssetFormat.AIRPORT,
        width: 1.2,
        height: 0.7,
        unit: "m",
        illumination: Illumination.DIGITAL,
        status: AssetStatus.VACANT,
        monthlyRate: 350000,
        dailyImpressions: 15000,
        specs: "Resolution: 1920×1080 | Format: MP4, JPEG | Slot: 10s in 60s loop",
      },
    }),

    prisma.asset.upsert({
      where: { code: "TIA-INT-DEP-001" },
      update: {},
      create: {
        name: "TIA International Departure Lounge Screen",
        code: "TIA-INT-DEP-001",
        description: "98-inch 4K LED display in the International Departure lounge near gate 3.",
        address: "Tribhuvan International Airport, Departure Lounge",
        city: "Kathmandu",
        district: "Bagmati",
        lat: 27.6966,
        lng: 85.3592,
        format: AssetFormat.AIRPORT,
        width: 2.1,
        height: 1.2,
        unit: "m",
        illumination: Illumination.DIGITAL,
        status: AssetStatus.BOOKED,
        monthlyRate: 450000,
        dailyImpressions: 12000,
        specs: "Resolution: 3840×2160 | Format: MP4, JPEG | Slot: 15s in 90s loop",
      },
    }),

    prisma.asset.upsert({
      where: { code: "KTM-RR-KAL-001" },
      update: {},
      create: {
        name: "Kalanki Chowk Unipole – North Face",
        code: "KTM-RR-KAL-001",
        description: "Premium 10m×5m unipole at Kalanki junction, Nepal's busiest traffic intersection on the Ring Road.",
        address: "Kalanki Chowk, Ring Road",
        city: "Kathmandu",
        district: "Bagmati",
        lat: 27.6938,
        lng: 85.2797,
        format: AssetFormat.UNIPOLE,
        width: 10,
        height: 5,
        unit: "ft",
        illumination: Illumination.FRONT_LIT,
        status: AssetStatus.VACANT,
        monthlyRate: 120000,
        dailyImpressions: 120000,
        specs: "Print: Flex vinyl 280gsm | Bleed: 15cm | File format: AI/PDF at 100 DPI",
      },
    }),

    prisma.asset.upsert({
      where: { code: "KTM-RR-MAI-001" },
      update: {},
      create: {
        name: "Maitighar Mandala Billboard",
        code: "KTM-RR-MAI-001",
        description: "12m×6m backlit hoarding facing the Maitighar Mandala roundabout — prime Kathmandu central location.",
        address: "Maitighar Mandala, New Baneshwor Road",
        city: "Kathmandu",
        district: "Bagmati",
        lat: 27.6991,
        lng: 85.3192,
        format: AssetFormat.STATIC_BILLBOARD,
        width: 12,
        height: 6,
        unit: "ft",
        illumination: Illumination.BACK_LIT,
        status: AssetStatus.VACANT,
        monthlyRate: 90000,
        dailyImpressions: 80000,
        specs: "Print: Translucent flex | LED back-lit | Bleed: 15cm",
      },
    }),

    prisma.asset.upsert({
      where: { code: "KTM-DIG-DUR-001" },
      update: {},
      create: {
        name: "Durbar Marg Digital Screen",
        code: "KTM-DIG-DUR-001",
        description: "Outdoor LED digital screen at Durbar Marg, Kathmandu's premium commercial corridor.",
        address: "Durbar Marg, Opposite Yak & Yeti Hotel",
        city: "Kathmandu",
        district: "Bagmati",
        lat: 27.7121,
        lng: 85.3151,
        format: AssetFormat.DIGITAL_SCREEN,
        width: 4,
        height: 2.5,
        unit: "m",
        illumination: Illumination.DIGITAL,
        status: AssetStatus.VACANT,
        monthlyRate: 200000,
        dailyImpressions: 50000,
        specs: "Resolution: P6 outdoor LED | 10s slot in 60s loop | Min booking: 4 weeks",
      },
    }),

    prisma.asset.upsert({
      where: { code: "PKR-LSR-001" },
      update: {},
      create: {
        name: "Pokhara Lakeside Road Billboard",
        code: "PKR-LSR-001",
        description: "8m×4m billboard on Lakeside Road – Pokhara's main tourist strip with international footfall.",
        address: "Lakeside Road, Pokhara-6, Kaski",
        city: "Pokhara",
        district: "Kaski",
        lat: 28.2096,
        lng: 83.9567,
        format: AssetFormat.STATIC_BILLBOARD,
        width: 8,
        height: 4,
        unit: "ft",
        illumination: Illumination.FRONT_LIT,
        status: AssetStatus.VACANT,
        monthlyRate: 45000,
        dailyImpressions: 30000,
        specs: "Print: Flex vinyl | Front illuminated | Min: 1 month",
      },
    }),

    prisma.asset.upsert({
      where: { code: "CTW-BHP-001" },
      update: {},
      create: {
        name: "Bharatpur Highway Entry Unipole",
        code: "CTW-BHP-001",
        description: "10m×5m unipole at the main entry point to Bharatpur from Prithvi Highway.",
        address: "Prithvi Highway, Bharatpur Entry, Chitwan",
        city: "Bharatpur",
        district: "Chitwan",
        lat: 27.6767,
        lng: 84.4291,
        format: AssetFormat.UNIPOLE,
        width: 10,
        height: 5,
        unit: "ft",
        illumination: Illumination.BACK_LIT,
        status: AssetStatus.VACANT,
        monthlyRate: 40000,
        dailyImpressions: 40000,
        specs: "Print: Flex vinyl | Back lit | Min: 3 months",
      },
    }),

    prisma.asset.upsert({
      where: { code: "KTM-MALL-CIV-001" },
      update: {},
      create: {
        name: "Civil Mall Atrium LED Screen",
        code: "KTM-MALL-CIV-001",
        description: "Large format LED screen above the main atrium at Civil Mall, Sundhara.",
        address: "Civil Mall, Sundhara, Kathmandu",
        city: "Kathmandu",
        district: "Bagmati",
        lat: 27.6993,
        lng: 85.3127,
        format: AssetFormat.MALL,
        width: 3,
        height: 2,
        unit: "m",
        illumination: Illumination.DIGITAL,
        status: AssetStatus.VACANT,
        monthlyRate: 150000,
        dailyImpressions: 20000,
        specs: "Full HD LED | Loop: 15s in 120s | Mall hours: 10am–9pm",
      },
    }),
  ]);

  console.log(`✅ ${assets.length} assets created`);

  // ─── 3. Clients ───────────────────────────────────────────────────────────
  const client1 = await prisma.client.upsert({
    where: { email: "marketing@nabilbank.com" },
    update: {},
    create: {
      companyName: "Nabil Bank Limited",
      brandName: "Nabil Bank",
      contactPerson: "Anil Maharjan",
      email: "marketing@nabilbank.com",
      phone: "9801234567",
      countryCode: "+977",
      preferredChannel: PreferredChannel.EMAIL,
      address: "Nabil Bank Head Office, Kamaladi, Kathmandu",
      city: "Kathmandu",
      website: "https://www.nabilbank.com",
      notes: "Long-term client since 2015. Runs 2–3 campaigns per year.",
    },
  });

  const client2 = await prisma.client.upsert({
    where: { email: "ads@ncell.com.np" },
    update: {},
    create: {
      companyName: "Ncell Pvt. Ltd.",
      brandName: "Ncell",
      contactPerson: "Priya Gurung",
      email: "ads@ncell.com.np",
      phone: "9851234567",
      countryCode: "+977",
      preferredChannel: PreferredChannel.WHATSAPP,
      telegramChatId: null,
      address: "Ncell Center, Lainchaur, Kathmandu",
      city: "Kathmandu",
      website: "https://www.ncell.com.np",
      notes: "Telecom client. Large campaign budgets. Preferred channel: WhatsApp.",
    },
  });

  const client3 = await prisma.client.upsert({
    where: { email: "marketing@unilevernepal.com" },
    update: {},
    create: {
      companyName: "Unilever Nepal Limited",
      brandName: "Unilever",
      contactPerson: "Sarah Thompson",
      email: "marketing@unilevernepal.com",
      phone: "9861234567",
      countryCode: "+977",
      preferredChannel: PreferredChannel.ALL,
      address: "Hetauda Industrial District, Makwanpur",
      city: "Hetauda",
      website: "https://www.unilevernepal.com",
      notes: "International FMCG brand. Multi-city campaigns.",
    },
  });

  console.log("✅ Clients created:", client1.companyName, client2.companyName, client3.companyName);

  // ─── 4. Contracts ─────────────────────────────────────────────────────────
  const now = new Date();
  const start1 = new Date(now.getFullYear(), now.getMonth(), 1);
  const end1 = new Date(now.getFullYear(), now.getMonth() + 3, 0);

  const contract1 = await prisma.contract.upsert({
    where: { contractNumber: "SM-2501-0001" },
    update: {},
    create: {
      contractNumber: "SM-2501-0001",
      clientId: client1.id,
      startDate: start1,
      endDate: end1,
      totalValue: 1050000,
      paymentTerms: "50% advance, 50% on installation",
      status: ContractStatus.ACTIVE,
      createdById: superAdmin.id,
      notes: "Q1 2025 brand awareness campaign. Airport arrival + Kalanki unipole.",
      contractAssets: {
        create: [
          { assetId: assets[0].id },
          { assetId: assets[2].id },
        ],
      },
    },
  });

  const start2 = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end2 = new Date(now.getFullYear(), now.getMonth() + 2, 28);

  const contract2 = await prisma.contract.upsert({
    where: { contractNumber: "SM-2501-0002" },
    update: {},
    create: {
      contractNumber: "SM-2501-0002",
      clientId: client2.id,
      startDate: start2,
      endDate: end2,
      totalValue: 750000,
      paymentTerms: "Monthly billing",
      status: ContractStatus.ACTIVE,
      createdById: manager.id,
      notes: "Ncell product launch – Durbar Marg digital screen.",
      contractAssets: {
        create: [{ assetId: assets[4].id }],
      },
    },
  });

  console.log("✅ Contracts created:", contract1.contractNumber, contract2.contractNumber);

  // ─── 5. Invoices ──────────────────────────────────────────────────────────
  const inv1Due = new Date(now.getFullYear(), now.getMonth(), 15);
  await prisma.invoice.upsert({
    where: { invoiceNumber: "INV-2501-0001" },
    update: {},
    create: {
      invoiceNumber: "INV-2501-0001",
      contractId: contract1.id,
      clientId: client1.id,
      amount: 525000,
      taxAmount: 73500,
      totalAmount: 598500,
      dueDate: inv1Due,
      status: "PENDING",
    },
  });

  const inv2Due = new Date(now.getFullYear(), now.getMonth() - 1, 15);
  await prisma.invoice.upsert({
    where: { invoiceNumber: "INV-2501-0002" },
    update: {},
    create: {
      invoiceNumber: "INV-2501-0002",
      contractId: contract2.id,
      clientId: client2.id,
      amount: 250000,
      taxAmount: 35000,
      totalAmount: 285000,
      dueDate: inv2Due,
      paidDate: new Date(now.getFullYear(), now.getMonth() - 1, 12),
      paidAmount: 285000,
      status: "PAID",
    },
  });

  console.log("✅ Invoices created");

  // ─── 6. Reminder rules ────────────────────────────────────────────────────
  const reminderRules = [
    {
      name: "Contract Expiry – 7 days before",
      eventType: "CONTRACT_EXPIRY" as const,
      daysOffset: -7,
      channel: ["EMAIL", "WHATSAPP"],
      subject: "⚠️ Your Smart Media contract expires in 7 days",
      templateMessage:
        "Dear {{clientName}},\n\nThis is a reminder that your advertising contract #{{contractNumber}} for *{{assetName}}* expires on *{{contractEndDate}}* — that's in just 7 days!\n\nTo ensure uninterrupted advertising, please contact us to renew your contract.\n\n📞 Call: +977-1-4444444\n📧 Email: info@smartmedia.com.np\n🌐 Renew online: {{renewUrl}}\n\nBest regards,\nSmart Media Nepal",
      isActive: true,
    },
    {
      name: "Contract Expiry – 3 days before",
      eventType: "CONTRACT_EXPIRY" as const,
      daysOffset: -3,
      channel: ["EMAIL", "WHATSAPP", "TELEGRAM"],
      subject: "🚨 Contract expires in 3 days – Action required",
      templateMessage:
        "Dear {{clientName}},\n\n🚨 URGENT: Your contract #{{contractNumber}} for *{{assetName}}* expires in just 3 days on *{{contractEndDate}}*.\n\nPlease confirm renewal immediately to avoid your advertising being discontinued.\n\nContact us now:\n📞 +977-1-4444444\n📧 info@smartmedia.com.np\n\nSmart Media Nepal",
      isActive: true,
    },
    {
      name: "Contract Expiry – 1 day before",
      eventType: "CONTRACT_EXPIRY" as const,
      daysOffset: -1,
      channel: ["WHATSAPP"],
      subject: "Last chance: Contract expires tomorrow",
      templateMessage:
        "Dear {{clientName}}, your Smart Media contract #{{contractNumber}} expires TOMORROW ({{contractEndDate}}). Call us immediately at +977-1-4444444 to renew. – Smart Media Nepal",
      isActive: true,
    },
    {
      name: "Payment Due – 7 days before",
      eventType: "PAYMENT_DUE" as const,
      daysOffset: -7,
      channel: ["EMAIL"],
      subject: "Payment reminder: Invoice due in 7 days",
      templateMessage:
        "Dear {{clientName}},\n\nThis is a friendly reminder that Invoice #{{invoiceNumber}} for *{{invoiceAmount}}* is due on *{{dueDate}}* — 7 days from now.\n\nPlease arrange payment to our account:\nAccount: Smart Media Nepal\nBank: XYZ Bank, Kathmandu\nAccount No: XXXXXXXXXX\n\nIf you have already paid, please disregard this message.\n\nBest regards,\nSmarts Media Nepal",
      isActive: true,
    },
    {
      name: "Payment Due – 1 day before",
      eventType: "PAYMENT_DUE" as const,
      daysOffset: -1,
      channel: ["EMAIL", "WHATSAPP"],
      subject: "⚠️ Invoice due tomorrow",
      templateMessage:
        "Dear {{clientName}}, your invoice of {{invoiceAmount}} is due TOMORROW ({{dueDate}}). Please ensure payment is made to avoid service disruption. Call +977-1-4444444 for any queries. – Smart Media Nepal",
      isActive: true,
    },
    {
      name: "Campaign End Follow-up",
      eventType: "CAMPAIGN_END" as const,
      daysOffset: 1,
      channel: ["EMAIL"],
      subject: "Your campaign has ended – Ready to renew?",
      templateMessage:
        "Dear {{clientName}},\n\nYour advertising campaign on *{{assetName}}* concluded on {{contractEndDate}}. We hope it delivered great results for your brand!\n\n🎯 We'd love to continue the momentum. Our team has prepared renewal options and new site recommendations for your review.\n\nShall we schedule a brief call this week?\n\n📞 +977-1-4444444 | 📧 info@smartmedia.com.np\n\nThank you for choosing Smart Media Nepal.",
      isActive: true,
    },
    {
      name: "Campaign Start – Artwork Reminder",
      eventType: "CAMPAIGN_START" as const,
      daysOffset: -1,
      channel: ["EMAIL", "WHATSAPP"],
      subject: "Your campaign starts tomorrow – Artwork checklist",
      templateMessage:
        "Dear {{clientName}},\n\nExciting news! Your advertising campaign on *{{assetName}}* goes live TOMORROW ({{contractStartDate}}).\n\n✅ Pre-launch checklist:\n• Final artwork approved\n• Installation team on-site from 8am\n• Contact our ops team: +977-9801XXXXXX\n\nWe'll send you proof-of-display photos once live.\n\nSmart Media Nepal",
      isActive: true,
    },
  ];

  for (const rule of reminderRules) {
    await prisma.reminderRule.upsert({
      where: { id: rule.name }, // Use name as proxy – will create if not exists
      update: {},
      create: rule,
    }).catch(() =>
      prisma.reminderRule.create({ data: rule })
    );
  }

  console.log(`✅ ${reminderRules.length} reminder rules created`);

  // ─── 7. Inventory items ───────────────────────────────────────────────────
  const inventoryItems = [
    { name: "Flex Vinyl Roll (280gsm)", category: "VINYL" as const, quantity: 500, unit: "sqm", reorderLevel: 100, currentCost: 85, supplier: "Nepal Flex Supplies", sku: "VNL-280-001" },
    { name: "Flex Vinyl Roll (440gsm backlit)", category: "VINYL" as const, quantity: 200, unit: "sqm", reorderLevel: 50, currentCost: 120, supplier: "Nepal Flex Supplies", sku: "VNL-440-001" },
    { name: "Eco-Solvent Ink – Cyan", category: "INK" as const, quantity: 15, unit: "litre", reorderLevel: 5, currentCost: 2500, supplier: "PrintPro Nepal", sku: "INK-CYN-001" },
    { name: "Eco-Solvent Ink – Magenta", category: "INK" as const, quantity: 12, unit: "litre", reorderLevel: 5, currentCost: 2500, supplier: "PrintPro Nepal", sku: "INK-MAG-001" },
    { name: "Eco-Solvent Ink – Yellow", category: "INK" as const, quantity: 18, unit: "litre", reorderLevel: 5, currentCost: 2400, supplier: "PrintPro Nepal", sku: "INK-YLW-001" },
    { name: "Eco-Solvent Ink – Black", category: "INK" as const, quantity: 8, unit: "litre", reorderLevel: 5, currentCost: 2200, supplier: "PrintPro Nepal", sku: "INK-BLK-001" },
    { name: "Eye Bolt M8", category: "HARDWARE" as const, quantity: 200, unit: "pcs", reorderLevel: 50, currentCost: 25, supplier: "Kathmandu Hardware", sku: "HW-EYE-001" },
    { name: "Bungee Cord 30cm", category: "HARDWARE" as const, quantity: 500, unit: "pcs", reorderLevel: 100, currentCost: 45, supplier: "Kathmandu Hardware", sku: "HW-BUN-001" },
    { name: "Aluminium Frame 1m", category: "HARDWARE" as const, quantity: 50, unit: "pcs", reorderLevel: 15, currentCost: 450, supplier: "Metalworks Nepal", sku: "HW-ALU-001" },
    { name: "LED Strip Light (IP65)", category: "ELECTRICAL" as const, quantity: 100, unit: "metre", reorderLevel: 20, currentCost: 350, supplier: "Lights Nepal", sku: "ELC-LED-001" },
  ];

  for (const item of inventoryItems) {
    await prisma.inventoryItem.upsert({
      where: { sku: item.sku },
      update: { quantity: item.quantity },
      create: { ...item, lastRestocked: new Date() },
    });
  }

  console.log(`✅ ${inventoryItems.length} inventory items created`);

  // ─── 8. Sample enquiry ────────────────────────────────────────────────────
  await prisma.enquiry.create({
    data: {
      name: "Bikash Karmacharya",
      email: "bikash@cgcorp.com",
      phone: "9841234567",
      company: "CG Corp Global",
      service: "airport",
      message: "Interested in airport advertising at TIA for our new product launch in March. Please share availability and rates for the International Arrival screens.",
      status: "NEW",
    },
  });

  console.log("✅ Sample enquiry created");

  // ─── 9. Site settings ─────────────────────────────────────────────────────
  const settings = [
    { key: "site_name", value: "Smart Media Nepal" },
    { key: "contact_email", value: "info@smartmedia.com.np" },
    { key: "contact_phone", value: "+977-1-4444444" },
    { key: "address", value: "Putalisadak, Kathmandu, Nepal" },
    { key: "invoice_tax_rate", value: "13" },
    { key: "invoice_prefix", value: "INV" },
    { key: "contract_prefix", value: "SM" },
  ];

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value, updatedAt: new Date() },
      create: { key: setting.key, value: setting.value, updatedAt: new Date() },
    });
  }

  console.log("✅ Site settings seeded");
  console.log("\n🎉 Seeding complete! Login credentials:");
  console.log("   SuperAdmin: admin@smartmedia.com.np / SmartMedia@2025");
  console.log("   Manager:    manager@smartmedia.com.np / SmartMedia@2025");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
