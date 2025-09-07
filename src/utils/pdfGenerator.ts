import jsPDF from 'jspdf';
import { LiveBirthPlan } from '@/hooks/useLiveBirthPlan';

// Enhanced birth plan data structure for PDF
export interface BirthPlanPDFData {
  personalInfo: {
    name?: string;
    dueDate?: string;
    hospital?: string;
    provider?: string;
  };
  birthPhilosophy: string;
  quickReference: {
    painManagement: string;
    supportTeam: string;
    keyPreferences: string[];
    communicationStyle: string;
  };
  painManagement: {
    primaryApproach: string;
    comfortMeasures: string[];
    backupPlan: string;
    partnerRole: string;
    communicationPrefs: string;
  };
  supportTeam: {
    primaryPeople: string[];
    roles: Record<string, string>;
    decisionMaking: string;
    visitorPrefs: string;
    advocacyApproach: string;
  };
  laborEnvironment: {
    lighting: string;
    sound: string;
    personalItems: string[];
    mobility: string;
    privacy: string;
    cultural: string;
  };
  deliveryPreferences: {
    positions: string[];
    episiotomy: string;
    assistedDelivery: string;
    cordClamping: string;
    birthMoments: string[];
    emergencyScenarios: string;
  };
  newbornCare: {
    immediatePriorities: string[];
    feedingPlan: string;
    procedures: Record<string, string>;
    rooming: string;
  };
  postpartumPlanning: {
    recoveryPriorities: string;
    visitors: string;
    supportNeeds: string[];
    discharge: string;
    followUp: string[];
  };
  communicationScripts: {
    painManagement: string;
    advocacy: string;
    interventions: string;
    partnerSupport: string;
    emergency: string;
  };
  resources: string[];
}

// Transform LiveBirthPlan to PDF data structure
export function transformToPDFData(birthPlan: LiveBirthPlan): BirthPlanPDFData {
  return {
    personalInfo: {
      name: '',
      dueDate: '',
      hospital: '',
      provider: ''
    },
    birthPhilosophy: generateBirthPhilosophy(birthPlan),
    quickReference: {
      painManagement: birthPlan.painManagement?.content[0] || 'Not yet discussed',
      supportTeam: birthPlan.supportTeam?.content[0] || 'Not yet discussed', 
      keyPreferences: getKeyPreferences(birthPlan),
      communicationStyle: 'Open and collaborative discussion'
    },
    painManagement: {
      primaryApproach: birthPlan.painManagement?.content[0] || 'Exploring options',
      comfortMeasures: birthPlan.painManagement?.content.slice(1) || [],
      backupPlan: 'Flexible approach based on labor progression',
      partnerRole: birthPlan.supportTeam?.content.find(item => item.includes('partner')) || 'Supportive presence',
      communicationPrefs: 'Please discuss all options with me before proceeding'
    },
    supportTeam: {
      primaryPeople: birthPlan.supportTeam?.content || [],
      roles: {},
      decisionMaking: 'Collaborative decisions between patient and medical team',
      visitorPrefs: 'Limited visitors during active labor',
      advocacyApproach: 'Respectful communication and informed consent'
    },
    laborEnvironment: {
      lighting: birthPlan.environment?.content.find(item => item.toLowerCase().includes('light')) || 'Dimmed lighting preferred',
      sound: birthPlan.environment?.content.find(item => item.toLowerCase().includes('music') || item.toLowerCase().includes('sound')) || 'Calm environment',
      personalItems: birthPlan.environment?.content.filter(item => item.toLowerCase().includes('bring') || item.toLowerCase().includes('personal')) || [],
      mobility: birthPlan.laborPreferences?.content.find(item => item.toLowerCase().includes('move') || item.toLowerCase().includes('position')) || 'Freedom to move as desired',
      privacy: 'Minimal interruptions during active labor',
      cultural: ''
    },
    deliveryPreferences: {
      positions: birthPlan.laborPreferences?.content.filter(item => item.toLowerCase().includes('position')) || [],
      episiotomy: 'Avoid unless medically necessary',
      assistedDelivery: 'Discuss options if needed',
      cordClamping: birthPlan.specialRequests?.content.find(item => item.toLowerCase().includes('cord')) || 'Delayed cord clamping preferred',
      birthMoments: birthPlan.specialRequests?.content || [],
      emergencyScenarios: 'Keep me informed of all decisions and alternatives'
    },
    newbornCare: {
      immediatePriorities: ['Immediate skin-to-skin contact', 'Breastfeeding within first hour'],
      feedingPlan: 'Breastfeeding with support as needed',
      procedures: {
        vitaminK: 'Standard timing',
        eyeOintment: 'Standard timing',
        hepatitisB: 'Hospital administration'
      },
      rooming: '24-hour rooming-in preferred'
    },
    postpartumPlanning: {
      recoveryPriorities: 'Rest and bonding time',
      visitors: 'Limited visitors for first 24 hours',
      supportNeeds: ['Lactation support', 'Meal assistance'],
      discharge: 'When medically appropriate',
      followUp: ['Pediatrician appointment', 'Lactation consultant']
    },
    communicationScripts: {
      painManagement: 'Please explain all pain management options and their effects on labor.',
      advocacy: 'I would like to be informed of all procedures before they happen.',
      interventions: 'Please discuss the risks and benefits of any interventions.',
      partnerSupport: 'My partner is here to support my decisions and advocate for my wishes.',
      emergency: 'In emergency situations, please keep me informed as much as possible.'
    },
    resources: [
      'Postpartum Support International: 1-800-944-4773',
      'Crisis Text Line: Text HOME to 741741',
      'National Suicide Prevention Lifeline: 988'
    ]
  };
}

function generateBirthPhilosophy(birthPlan: LiveBirthPlan): string {
  const completedSections = Object.values(birthPlan).filter(section => section.isComplete);
  if (completedSections.length === 0) {
    return 'I believe in being informed, respected, and supported throughout my birth experience.';
  }
  
  return 'I believe in a birth experience that honors my choices, respects my body, and prioritizes the health and safety of both me and my baby while maintaining my dignity and autonomy.';
}

function getKeyPreferences(birthPlan: LiveBirthPlan): string[] {
  const prefs: string[] = [];
  
  if (birthPlan.painManagement?.isComplete) {
    prefs.push(birthPlan.painManagement.content[0]);
  }
  if (birthPlan.supportTeam?.isComplete) {
    prefs.push('Strong support team presence');
  }
  if (birthPlan.environment?.isComplete) {
    prefs.push('Comfortable labor environment');
  }
  
  return prefs.slice(0, 3);
}

export function generateBirthPlanPDF(data: BirthPlanPDFData): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;

  // Brand colors (converted to RGB) - as separate RGB values for jsPDF
  const primaryColor = [255, 87, 34] as const; // #FF5722
  const textColor = [44, 44, 44] as const; // #2C2C2C

  // Helper function to add text with automatic line breaks
  function addText(text: string, x: number, y: number, maxWidth: number, fontSize = 11): number {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * fontSize * 0.4);
  }

  // Helper function to add section header
  function addSectionHeader(title: string, y: number): number {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 87, 34); // Primary color
    doc.text(title.toUpperCase(), margin, y);
    doc.setTextColor(44, 44, 44); // Text color
    return y + 15;
  }

  // Helper function to add checkbox
  function addCheckbox(text: string, x: number, y: number, checked = false): number {
    doc.rect(x, y - 3, 3, 3);
    if (checked) {
      doc.text('✓', x + 0.5, y + 0.5);
    }
    doc.setFont('helvetica', 'normal');
    doc.text(text, x + 6, y);
    return y + 6;
  }

  // Page 1: Header & Overview
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 87, 34); // Primary color
  doc.text('MY BIRTH PLAN', margin, yPos);
  
  yPos += 15;
  doc.setFontSize(11);
  doc.setTextColor(44, 44, 44); // Text color
  doc.text('Created with Birth Plan Assistant', margin, yPos);
  
  // Personal info (top right)
  doc.setFontSize(10);
  const infoX = pageWidth - margin - 80;
  let infoY = margin;
  doc.text(`Name: ${data.personalInfo.name || '_________________'}`, infoX, infoY);
  infoY += 8;
  doc.text(`Due Date: ${data.personalInfo.dueDate || '_________________'}`, infoX, infoY);
  infoY += 8;
  doc.text(`Hospital: ${data.personalInfo.hospital || '_________________'}`, infoX, infoY);
  infoY += 8;
  doc.text(`Provider: ${data.personalInfo.provider || '_________________'}`, infoX, infoY);
  infoY += 8;
  doc.text(`Created: ${new Date().toLocaleDateString()}`, infoX, infoY);

  yPos += 25;

  // Birth Philosophy
  yPos = addSectionHeader('MY BIRTH PHILOSOPHY', yPos);
  yPos = addText(data.birthPhilosophy, margin, yPos, pageWidth - 2 * margin) + 10;

  // Quick Reference
  yPos = addSectionHeader('QUICK REFERENCE FOR MEDICAL TEAM', yPos);
  yPos = addCheckbox(`Pain Management: ${data.quickReference.painManagement}`, margin + 5, yPos) + 3;
  yPos = addCheckbox(`Support Team: ${data.quickReference.supportTeam}`, margin + 5, yPos) + 3;
  yPos = addCheckbox(`Key Preferences: ${data.quickReference.keyPreferences.join(', ')}`, margin + 5, yPos) + 3;
  yPos = addCheckbox(`Communication: ${data.quickReference.communicationStyle}`, margin + 5, yPos) + 10;

  // Page 2: Detailed Preferences
  doc.addPage();
  yPos = margin;

  // Pain Management
  yPos = addSectionHeader('PAIN MANAGEMENT', yPos);
  doc.setFont('helvetica', 'bold');
  doc.text('Primary Approach:', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(data.painManagement.primaryApproach, margin + 45, yPos);
  yPos += 10;

  doc.setFont('helvetica', 'bold');
  doc.text('Preferred Comfort Measures:', margin, yPos);
  yPos += 8;
  doc.setFont('helvetica', 'normal');
  data.painManagement.comfortMeasures.forEach(measure => {
    yPos = addText(`• ${measure}`, margin + 5, yPos, pageWidth - 2 * margin - 5) + 3;
  });
  yPos += 5;

  doc.setFont('helvetica', 'bold');
  doc.text('Backup Plan:', margin, yPos);
  yPos += 8;
  doc.setFont('helvetica', 'normal');
  yPos = addText(data.painManagement.backupPlan, margin + 5, yPos, pageWidth - 2 * margin - 5) + 10;

  // Support Team
  yPos = addSectionHeader('SUPPORT TEAM', yPos);
  doc.setFont('helvetica', 'bold');
  doc.text('Primary Support People:', margin, yPos);
  yPos += 8;
  doc.setFont('helvetica', 'normal');
  data.supportTeam.primaryPeople.forEach(person => {
    yPos = addText(`• ${person}`, margin + 5, yPos, pageWidth - 2 * margin - 5) + 3;
  });
  yPos += 10;

  // Labor Environment
  yPos = addSectionHeader('LABOR ENVIRONMENT', yPos);
  yPos = addCheckbox(`Lighting: ${data.laborEnvironment.lighting}`, margin + 5, yPos) + 3;
  yPos = addCheckbox(`Sound: ${data.laborEnvironment.sound}`, margin + 5, yPos) + 3;
  yPos = addCheckbox(`Mobility: ${data.laborEnvironment.mobility}`, margin + 5, yPos) + 10;

  // Page 3: Delivery & Care
  doc.addPage();
  yPos = margin;

  // Delivery Preferences
  yPos = addSectionHeader('DELIVERY PREFERENCES', yPos);
  doc.setFont('helvetica', 'bold');
  doc.text('Preferred Positions:', margin, yPos);
  yPos += 8;
  doc.setFont('helvetica', 'normal');
  if (data.deliveryPreferences.positions.length > 0) {
    data.deliveryPreferences.positions.forEach(position => {
      yPos = addText(`• ${position}`, margin + 5, yPos, pageWidth - 2 * margin - 5) + 3;
    });
  } else {
    yPos = addText('• Open to various positions as comfortable', margin + 5, yPos, pageWidth - 2 * margin - 5) + 3;
  }
  yPos += 5;

  yPos = addCheckbox(`Episiotomy: ${data.deliveryPreferences.episiotomy}`, margin + 5, yPos) + 3;
  yPos = addCheckbox(`Cord Clamping: ${data.deliveryPreferences.cordClamping}`, margin + 5, yPos) + 10;

  // Newborn Care
  yPos = addSectionHeader('NEWBORN CARE', yPos);
  doc.setFont('helvetica', 'bold');
  doc.text('Immediate Priorities:', margin, yPos);
  yPos += 8;
  doc.setFont('helvetica', 'normal');
  data.newbornCare.immediatePriorities.forEach(priority => {
    yPos = addText(`• ${priority}`, margin + 5, yPos, pageWidth - 2 * margin - 5) + 3;
  });
  yPos += 5;

  doc.setFont('helvetica', 'bold');
  doc.text(`Feeding Plan: ${data.newbornCare.feedingPlan}`, margin, yPos);
  yPos += 10;

  yPos = addCheckbox(`Rooming: ${data.newbornCare.rooming}`, margin + 5, yPos) + 10;

  // Page 4: Communication & Planning
  doc.addPage();
  yPos = margin;

  // Communication Scripts
  yPos = addSectionHeader('COMMUNICATION PREFERENCES', yPos);
  
  doc.setFont('helvetica', 'bold');
  doc.text('For Pain Management:', margin, yPos);
  yPos += 6;
  doc.setFont('helvetica', 'normal');
  yPos = addText(`"${data.communicationScripts.painManagement}"`, margin + 5, yPos, pageWidth - 2 * margin - 5, 10) + 8;

  doc.setFont('helvetica', 'bold');
  doc.text('For Advocacy:', margin, yPos);
  yPos += 6;
  doc.setFont('helvetica', 'normal');
  yPos = addText(`"${data.communicationScripts.advocacy}"`, margin + 5, yPos, pageWidth - 2 * margin - 5, 10) + 8;

  doc.setFont('helvetica', 'bold');
  doc.text('For Interventions:', margin, yPos);
  yPos += 6;
  doc.setFont('helvetica', 'normal');
  yPos = addText(`"${data.communicationScripts.interventions}"`, margin + 5, yPos, pageWidth - 2 * margin - 5, 10) + 15;

  // Postpartum Planning
  yPos = addSectionHeader('POSTPARTUM PLANNING', yPos);
  doc.setFont('helvetica', 'bold');
  doc.text(`Recovery Priorities: ${data.postpartumPlanning.recoveryPriorities}`, margin, yPos);
  yPos += 8;
  doc.text(`Visitor Management: ${data.postpartumPlanning.visitors}`, margin, yPos);
  yPos += 8;
  doc.text(`Discharge Planning: ${data.postpartumPlanning.discharge}`, margin, yPos);
  yPos += 15;

  // Page 5: Flexibility & Resources
  doc.addPage();
  yPos = margin;

  // Flexibility Statement
  yPos = addSectionHeader('IMPORTANT NOTE ABOUT FLEXIBILITY', yPos);
  const flexibilityText = 'This birth plan represents my preferences and hopes for my birth experience. I understand that birth can be unpredictable, and I\'m prepared to be flexible when medical circumstances require changes to this plan. My priority is the health and safety of both me and my baby. I appreciate open communication about any necessary changes to help me feel informed and involved in decisions.';
  yPos = addText(flexibilityText, margin, yPos, pageWidth - 2 * margin, 11) + 15;

  // Emergency Contacts
  yPos = addSectionHeader('EMERGENCY CONTACTS & RESOURCES', yPos);
  doc.setFont('helvetica', 'normal');
  data.resources.forEach(resource => {
    yPos = addText(`• ${resource}`, margin + 5, yPos, pageWidth - 2 * margin - 5) + 4;
  });
  yPos += 15;

  // Acknowledgment
  yPos = addSectionHeader('ACKNOWLEDGMENT', yPos);
  const acknowledgmentText = 'I have discussed this birth plan with my healthcare provider and understand that it will be used as a guide for my care, with flexibility for medical necessity and safety.';
  yPos = addText(acknowledgmentText, margin, yPos, pageWidth - 2 * margin, 11) + 15;

  doc.text('Patient Signature: _________________________ Date: _________', margin, yPos);
  yPos += 10;
  doc.text('Partner/Support Person: _________________________ Date: _________', margin, yPos);

  // Save the PDF
  doc.save('my-birth-plan.pdf');
}