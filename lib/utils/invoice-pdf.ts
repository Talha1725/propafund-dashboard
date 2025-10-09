import { jsPDF } from 'jspdf';
import type { PaymentHistoryItem } from '@/types/billing';

export const generateInvoicePDF = (payment: PaymentHistoryItem) => {
  const doc = new jsPDF();
  
  // 1. Company Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('FX UTOPIA', 20, 30);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Trading Challenge Provider', 20, 40);
  doc.text('Email: support@fxutopia.com', 20, 50);
  doc.text('Phone: +1 (555) 123-4567', 20, 60);
  
  // 2. Invoice Details
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 150, 30);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice #: ${payment.trackId}`, 150, 42);
  doc.text(`Date: ${new Date(payment.createdAt).toLocaleDateString()}`, 150, 52);
  doc.text(`Status: ${payment.status}`, 150, 62);
  
  // 3. Customer Information
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To:', 20, 80);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${payment.user.name}`, 20, 90);
  doc.text(`${payment.user.email}`, 20, 100);
  
  // 4. Account Details (if available)
  if (payment.mtAccount) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Account Details:', 110, 80);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Account ID: ${payment.mtAccount.accountId}`, 110, 90);
    doc.text(`Account Name: ${payment.mtAccount.accountName}`, 110, 100);
    doc.text(`Broker: ${payment.mtAccount.brokerName}`, 110, 110);
    doc.text(`Platform: ${payment.mtAccount.platform}`, 110, 120);
    doc.text(`Server: ${payment.mtAccount.server}`, 110, 130);
    doc.text(`Login: ${payment.mtAccount.login}`, 110, 140);
  }
  
  // 5. Service Details Table
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Service Details:', 20, 160);
  
  // Table headers
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Description', 20, 175);
  doc.text('Challenge Type', 80, 175);
  doc.text('Platform', 130, 175);
  doc.text('Amount', 160, 175);
  
  // Table content
  doc.setFont('helvetica', 'normal');
  const challengeType = payment.challenge === 'instantFund' ? 'Instant Fund' : 
                       payment.challenge === 'twoPhase' ? 'Two Phase' : 
                       payment.challenge.charAt(0).toUpperCase() + payment.challenge.slice(1);
  
  doc.text('Trading Challenge Account', 20, 185);
  doc.text(challengeType, 80, 185);
  doc.text(payment.platform.toUpperCase(), 130, 185);
  doc.text(`$${payment.amount.toFixed(2)}`, 160, 185);
  
  // Add-ons if available
  if (payment.addOns && payment.addOns.totalAddons > 0) {
    doc.text('Add-ons', 20, 195);
    doc.text(`${payment.addOns.totalAddons} items`, 80, 195);
    doc.text('Various', 130, 195);
    doc.text('$0.00', 160, 195); // Assuming add-ons are included in main amount
  }
  
  // 6. Payment Information
  const paymentY = payment.addOns && payment.addOns.totalAddons > 0 ? 210 : 200;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Information:', 20, paymentY);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Payment Method: ${payment.method}`, 20, paymentY + 10);
  doc.text(`Currency: ${payment.currency || 'USD'}`, 20, paymentY + 20);
  doc.text(`Account Balance: $${payment.balance.toLocaleString()}`, 20, paymentY + 30);
  
  // 7. Total Amount
  const totalY = paymentY + 50;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Amount:', 130, totalY);
  doc.setFontSize(14);
  doc.text(`$${payment.amount.toFixed(2)}`, 160, totalY + 10);
  
  // 8. Footer
  const footerY = totalY + 30;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for choosing FX UTOPIA for your trading challenge needs.', 20, footerY);
  doc.text('For support, please contact us at support@fxutopia.com', 20, footerY + 10);
  doc.text('This invoice was generated automatically on ' + new Date().toLocaleString(), 20, footerY + 20);
  
  // 9. Download
  const fileName = `fx-utopia-invoice-${payment.trackId}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
