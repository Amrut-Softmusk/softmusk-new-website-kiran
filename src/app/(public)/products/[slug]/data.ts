import type { ElementType } from "react";
import { Coins, Activity, Boxes, UtensilsCrossed, IdCard } from "lucide-react";

export type Product = {
  name: string;
  tag: string;
  tagline: string;
  desc: string;
  icon: ElementType;
  heroImage: string;
  color: string;
  externalUrl?: string;
  features: { title: string; text: string }[];
  highlights: string[];
};

export const productsData: Record<string, Product> = {
  "goldmusk": {
    name: "GoldMusk ERP",
    tag: "Jewellery ERP & Offline POS",
    tagline: "The offline-first POS & ERP built exclusively for Indian jewellers.",
    desc: "Run your jewellery business with total peace of mind — even during internet drops. GoldMusk ERP delivers lightning-fast offline billing, automated CGST/SGST/IGST and hallmarking compliance, digital Karigar ledgers with melting loss tracking, live gold rates, and instant barcode tag printing.",
    icon: Coins,
    heroImage: "/goldmusk-dashboard.png",
    color: "#F59E0B",
    externalUrl: "https://gold.softmusk.com/",
    features: [
      { 
        title: "Offline-First Counter POS", 
        text: "Uninterrupted local checkout during broadband drops or network failures. Operates on a secure local database that automatically synchronizes with cloud servers the moment connectivity is restored." 
      },
      { 
        title: "Digital Karigar & Melting Ledgers", 
        text: "Full digital accountability for raw gold issuances, returns, melting losses, purity adjustments, and jobwork worker wages. Eliminates paper ledger discrepancies permanently." 
      },
      { 
        title: "Live 24K, 22K & 18K Valuation", 
        text: "Real-time updates for bullion market rates with automatic repricing across entire showroom inventory and digital price display integration." 
      },
      { 
        title: "High-Precision Tag Printing", 
        text: "Generate thermal rat-tail jewellery tags and compact barcodes directly from the inwarding panel with metal purity, net weight, stone weight, and making charges." 
      },
      { 
        title: "Automated GST & BIS Compliance", 
        text: "Built-in HSN code mapping, instant split CGST/SGST calculations, automated e-invoicing, and BIS Hallmark documentation." 
      },
      { 
        title: "Customer Khata & Chit Funds", 
        text: "Manage customer gold accumulation schemes, revolving credit ledgers, and automated payment receipts via WhatsApp and SMS." 
      }
    ],
    highlights: ["100% Offline Billing", "Karigar Loss Ledgers", "Live Bullion Pricing", "Thermal Tag Printing"]
  },

  "medimusk-retail": {
    name: "MediMusk Retail (SoftBill)",
    tag: "Pharma Retail & Chemist POS",
    tagline: "High-speed billing and regulatory compliance for retail pharmacies.",
    desc: "A robust retail management suite engineered for chemist shops, retail pharmacies, and hospital dispensaries. Powered by high-speed barcode scanning, automated FIFO batch and expiry management, and rigorous Schedule H regulatory compliance.",
    icon: Activity,
    heroImage: "/medimusk-dashboard.jpg",
    color: "#06B6D4",
    features: [
      { 
        title: "High-Speed Barcode Billing", 
        text: "Scan barcodes and produce GST-compliant printed invoices in under 5 seconds. Includes instant generic medicine replacement lookup and fractional tablet strip billing." 
      },
      { 
        title: "FIFO Batch & Expiry Management", 
        text: "Prevents dispensing near-expiry medicines with automated FIFO (First-In, First-Out) stock rotation, expiration alert dashboards, and supplier return credit processing." 
      },
      { 
        title: "Schedule H & Narcotic Drug Logs", 
        text: "Strict digital registers for scheduled medications, recording prescribing doctor information, patient details, and audit-ready drug authority reports." 
      },
      { 
        title: "Patient Medication History", 
        text: "Securely stores patient prescription records, chronic illness repeat refills, medication allergy flags, and automated refill reminder messages." 
      },
      { 
        title: "Automated Low Stock Reordering", 
        text: "Configurable reorder thresholds automatically generate purchase orders for distributors, preventing stockouts of critical and life-saving medicines." 
      },
      { 
        title: "Multi-Counter POS & Cloud Sync", 
        text: "Seamlessly supports high-volume peak hours with multiple billing counters, cashier shift handovers, and centralized cloud oversight." 
      }
    ],
    highlights: ["FIFO Expiry Alerts", "Schedule H Compliance", "Generic Drug Search", "Multi-Counter POS"]
  },

  "medimusk": {
    // Alias to medimusk-retail
    name: "MediMusk Retail (SoftBill)",
    tag: "Pharma Retail & Chemist POS",
    tagline: "High-speed billing and regulatory compliance for retail pharmacies.",
    desc: "A robust retail management suite engineered for chemist shops, retail pharmacies, and hospital dispensaries. Powered by high-speed barcode scanning, automated FIFO batch and expiry management, and rigorous Schedule H regulatory compliance.",
    icon: Activity,
    heroImage: "/medimusk-dashboard.jpg",
    color: "#06B6D4",
    features: [
      { 
        title: "High-Speed Barcode Billing", 
        text: "Scan barcodes and produce GST-compliant printed invoices in under 5 seconds. Includes instant generic medicine replacement lookup and fractional tablet strip billing." 
      },
      { 
        title: "FIFO Batch & Expiry Management", 
        text: "Prevents dispensing near-expiry medicines with automated FIFO (First-In, First-Out) stock rotation, expiration alert dashboards, and supplier return credit processing." 
      },
      { 
        title: "Schedule H & Narcotic Drug Logs", 
        text: "Strict digital registers for scheduled medications, recording prescribing doctor information, patient details, and audit-ready drug authority reports." 
      },
      { 
        title: "Patient Medication History", 
        text: "Securely stores patient prescription records, chronic illness repeat refills, medication allergy flags, and automated refill reminder messages." 
      },
      { 
        title: "Automated Low Stock Reordering", 
        text: "Configurable reorder thresholds automatically generate purchase orders for distributors, preventing stockouts of critical and life-saving medicines." 
      },
      { 
        title: "Multi-Counter POS & Cloud Sync", 
        text: "Seamlessly supports high-volume peak hours with multiple billing counters, cashier shift handovers, and centralized cloud oversight." 
      }
    ],
    highlights: ["FIFO Expiry Alerts", "Schedule H Compliance", "Generic Drug Search", "Multi-Counter POS"]
  },

  "softbill-wholesale": {
    name: "SoftBill Wholesale",
    tag: "Pharma Wholesale & Supply Chain",
    tagline: "Enterprise distribution, order fulfillment, and distributor ledgers.",
    desc: "A medical wholesale billing and inventory platform built for pharmaceutical distributors, carrying and forwarding agents (C&F), and healthcare suppliers. Offers granular batch tracking, credit term management, and automated accounting integration.",
    icon: Boxes,
    heroImage: "/pharma-wholesale-dashboard.jpg",
    color: "#3B82F6",
    features: [
      { 
        title: "Warehouse Inventory & Batch Control", 
        text: "Full bin and rack-level warehouse tracking with batch-wise costing, temperature storage logging, and fast recall management for regulated drug supplies." 
      },
      { 
        title: "Bulk Invoicing & Commercial Billing", 
        text: "Generate wholesale delivery challans, tax invoices, split shipments, and bulk rate contracts with tiered discounts for hospital networks and retail chemists." 
      },
      { 
        title: "Distributor Ledgers & Credit Terms", 
        text: "Maintain exhaustive account records with customizable credit limits, outstanding aging analysis, payment collection cycles, and interest calculations." 
      },
      { 
        title: "Integrated Financial Accounting", 
        text: "Seamless synchronization with financial accounting books, bank reconciliations, profit-margin analysis, and automated GSTR-1 / GSTR-3B tax return reports." 
      },
      { 
        title: "Supply Chain & Order Fulfillment", 
        text: "Track purchase orders from pharmaceutical manufacturers to delivery dispatch with real-time stock allocation and logistics tracking." 
      },
      { 
        title: "Field Representative Order Booking", 
        text: "Field sales agents can book orders on-the-go via mobile interfaces, instantly checking real-time stock availability and retailer credit status." 
      }
    ],
    highlights: ["Warehouse Batch Tracking", "Distributor Credit Ledgers", "Bulk Order Dispatch", "Full GST Tax Filing"]
  },

  "softbill-restaurant": {
    name: "SoftBill Restaurant",
    tag: "Restaurant, Bar & Dining POS",
    tagline: "Accelerate table turnarounds with instant KOT and live billing.",
    desc: "Designed for high-traffic restaurants, bars, lounges, and food chains. Features interactive table floor maps, multi-printer Kitchen Order Ticket (KOT/BOT) routing, recipe inventory deduction, and daily cash shift balancing.",
    icon: UtensilsCrossed,
    heroImage: "/restaurant-pos-dashboard.jpg",
    color: "#F97316",
    features: [
      { 
        title: "Kitchen / Bar Order Tickets (KOT/BOT)", 
        text: "Instantaneous dispatch of orders to kitchen and bar thermal printers or digital kitchen display systems (KDS) with modifier notes and preparation timers." 
      },
      { 
        title: "Interactive Table Floor Layout", 
        text: "Visual table layout map color-coded by real-time status: vacant, occupied, running KOT, bill requested, or reserved. Easily handle table mergers and transfers." 
      },
      { 
        title: "Recipe & Raw Material Inventory", 
        text: "Automated consumption calculation deducting raw ingredients (produce, dairy, spirits) from warehouse inventory based on bill of materials (BOM) recipes." 
      },
      { 
        title: "Daily Cash & Shift Reconciliation", 
        text: "End-of-day cash drawer balancing, credit card & UPI reconciliation, petty cash disbursements, and shift closing reports with variance detection." 
      },
      { 
        title: "Split Billing & Multi-Tender Payments", 
        text: "Split invoices easily by seat, dish, or percentage with seamless handling of split payments across cash, credit cards, UPI, and corporate accounts." 
      },
      { 
        title: "Category & Dish Performance Analytics", 
        text: "Identify top-performing menu items, peak hourly sales surges, and waste patterns to maximize food cost efficiency and profitability." 
      }
    ],
    highlights: ["Instant KOT/BOT Routing", "Visual Floor Table Map", "Recipe Stock Deduction", "Shift Cash Reconciliation"]
  },

  "student-id-erp": {
    name: "Softmusk ID ERP",
    tag: "Student & Corporate ID Card ERP",
    tagline: "All-in-one ID card design, webcam capture, and batch printing system.",
    desc: "A comprehensive identification card management platform for educational institutions, colleges, universities, and enterprise organizations. Handles the full lifecycle from student data acquisition and digital photo capture to batch thermal printing.",
    icon: IdCard,
    heroImage: "/student-id-dashboard.jpg",
    color: "#8B5CF6",
    features: [
      { 
        title: "Visual Template Designer", 
        text: "Dynamic drag-and-drop designer supporting custom dimensions, institutional branding, variable student data fields, department color strips, and custom backgrounds." 
      },
      { 
        title: "Direct Webcam Photo & Signature Capture", 
        text: "Integrated live camera capture with automated face centering, background correction, cropping tools, and digital signature tablet capture." 
      },
      { 
        title: "Automated Barcode & QR Generation", 
        text: "Encodes student enrollment numbers, library barcodes, NFC/RFID chip IDs, and encrypted verification QR codes directly onto cards." 
      },
      { 
        title: "Anti-Counterfeit Security Features", 
        text: "Incorporate micro-text guilloche patterns, UV watermark layers, and hologram overlay parameters to eliminate counterfeit reproduction." 
      },
      { 
        title: "High-Volume Batch Printing Queue", 
        text: "Queue thousands of student cards for continuous single-sided or double-sided printing across Zebra, Fargo, Evolis, and Magicard card printers." 
      },
      { 
        title: "Centralized Student Database Sync", 
        text: "Directly import records from college ERP systems or CSV/Excel sheets with instant photo matching and cardholder reissuance history tracking." 
      }
    ],
    highlights: ["Drag-and-Drop Designer", "Webcam Face Capture", "Encrypted QR Encoding", "High-Volume Batch Print"]
  }
};
