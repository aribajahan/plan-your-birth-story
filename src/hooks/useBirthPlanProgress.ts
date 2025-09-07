import { useMemo } from "react";

export interface UserPreferences {
  painManagementApproach?: 'natural' | 'medical' | 'flexible';
  environmentStyle?: 'quiet' | 'lively' | 'flexible';
  supportNeeds?: 'minimal' | 'moderate' | 'extensive';
  communicationStyle?: 'direct' | 'gentle' | 'detailed';
  birthLocation?: 'hospital' | 'birthing-center' | 'home';
  previousExperience?: 'first-time' | 'experienced' | 'mixed';
}

export interface DiscussedTopics {
  painManagement: boolean;
  environment: boolean;
  positions: boolean;
  support: boolean;
  expectations: boolean;
}

export interface ProgressResult {
  completion: number; // 0-100
  sectionBreakdown: {
    preferences: number;
    discussion: number;
  };
  capturedPrefs: string[];
}

export const useBirthPlanProgress = (
  preferences: UserPreferences,
  discussed: DiscussedTopics
): ProgressResult => {
  return useMemo(() => {
    // Preferences coverage (50% of total)
    const prefKeys: (keyof UserPreferences)[] = [
      'painManagementApproach',
      'environmentStyle',
      'supportNeeds',
      'communicationStyle',
      'birthLocation',
      'previousExperience',
    ];
    const filledPrefs = prefKeys.reduce((acc, key) => (preferences[key] ? acc + 1 : acc), 0);
    const prefCoverage = prefKeys.length === 0 ? 0 : Math.round((filledPrefs / prefKeys.length) * 100);

    // Discussion coverage (50% of total)
    const discussedVals = Object.values(discussed || {});
    const discussedCount = discussedVals.filter(Boolean).length;
    const discussionCoverage = discussedVals.length === 0 ? 0 : Math.round((discussedCount / discussedVals.length) * 100);

    // Weighted completion
    const completion = Math.max(0, Math.min(100, Math.round(prefCoverage * 0.5 + discussionCoverage * 0.5)));

    const capturedPrefs: string[] = [];
    if (preferences.painManagementApproach) capturedPrefs.push(`Pain: ${preferences.painManagementApproach}`);
    if (preferences.environmentStyle) capturedPrefs.push(`Environment: ${preferences.environmentStyle}`);
    if (preferences.communicationStyle) capturedPrefs.push(`Comms: ${preferences.communicationStyle}`);
    if (preferences.birthLocation) capturedPrefs.push(`Location: ${preferences.birthLocation}`);
    if (preferences.previousExperience) capturedPrefs.push(`Experience: ${preferences.previousExperience}`);

    return {
      completion,
      sectionBreakdown: {
        preferences: prefCoverage,
        discussion: discussionCoverage,
      },
      capturedPrefs,
    };
  }, [preferences, discussed]);
};