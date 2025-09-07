import { useMemo } from "react";
import { UserPreferences, DiscussedTopics } from "@/components/ChatBirthPlan";

export interface BirthPlanSection {
  title: string;
  content: string[];
  isComplete: boolean;
}

export interface LiveBirthPlan {
  laborPreferences: BirthPlanSection;
  painManagement: BirthPlanSection;
  supportTeam: BirthPlanSection;
  environment: BirthPlanSection;
  specialRequests: BirthPlanSection;
}

export const useLiveBirthPlan = (
  preferences: UserPreferences,
  discussed: DiscussedTopics
): LiveBirthPlan => {
  return useMemo(() => {
    // Labor Preferences Section
    const laborContent: string[] = [];
    if (preferences.previousExperience === 'first-time') {
      laborContent.push("This is my first baby, so I'm looking for extra guidance and support");
    } else if (preferences.previousExperience === 'experienced') {
      laborContent.push("I've given birth before and have some experience with labor");
    }
    
    if (discussed.positions) {
      laborContent.push("I want freedom to move and change positions during labor");
    }

    // Pain Management Section
    const painContent: string[] = [];
    if (preferences.painManagementApproach === 'natural') {
      painContent.push("I prefer natural pain management methods including breathing, movement, and relaxation techniques");
    } else if (preferences.painManagementApproach === 'medical') {
      painContent.push("I'm open to medical pain relief options including epidural if needed");
    } else if (preferences.painManagementApproach === 'flexible') {
      painContent.push("I'd like to keep my pain management options open and decide in the moment");
    }

    // Support Team Section
    const supportContent: string[] = [];
    if (preferences.supportNeeds === 'minimal') {
      supportContent.push("I prefer minimal interventions and a calm, quiet support approach");
    } else if (preferences.supportNeeds === 'moderate') {
      supportContent.push("I appreciate balanced support - guidance when needed but space when I'm coping well");
    } else if (preferences.supportNeeds === 'extensive') {
      supportContent.push("I would like active support and frequent check-ins throughout labor");
    }

    if (preferences.communicationStyle === 'direct') {
      supportContent.push("Please communicate with me directly and clearly");
    } else if (preferences.communicationStyle === 'gentle') {
      supportContent.push("I prefer gentle, encouraging communication");
    } else if (preferences.communicationStyle === 'detailed') {
      supportContent.push("I appreciate detailed explanations of what's happening");
    }

    // Environment Section
    const environmentContent: string[] = [];
    if (preferences.environmentStyle === 'quiet') {
      environmentContent.push("I prefer a calm, peaceful environment with dimmed lights and minimal noise");
    } else if (preferences.environmentStyle === 'lively') {
      environmentContent.push("I'm comfortable with a more active environment and don't mind background activity");
    }

    if (preferences.birthLocation === 'hospital') {
      environmentContent.push("Planning to give birth in a hospital setting");
    } else if (preferences.birthLocation === 'birthing-center') {
      environmentContent.push("Planning to give birth at a birthing center");
    } else if (preferences.birthLocation === 'home') {
      environmentContent.push("Planning a home birth");
    }

    // Special Requests Section
    const specialContent: string[] = [];
    if (discussed.expectations) {
      specialContent.push("I've discussed my hopes and expectations for this birth experience");
    }

    return {
      laborPreferences: {
        title: "Labor Preferences",
        content: laborContent,
        isComplete: laborContent.length > 0
      },
      painManagement: {
        title: "Pain Management",
        content: painContent,
        isComplete: preferences.painManagementApproach !== undefined
      },
      supportTeam: {
        title: "Support & Communication",
        content: supportContent,
        isComplete: preferences.supportNeeds !== undefined || preferences.communicationStyle !== undefined
      },
      environment: {
        title: "Birth Environment",
        content: environmentContent,
        isComplete: preferences.environmentStyle !== undefined || preferences.birthLocation !== undefined
      },
      specialRequests: {
        title: "Additional Preferences",
        content: specialContent,
        isComplete: specialContent.length > 0
      }
    };
  }, [preferences, discussed]);
};