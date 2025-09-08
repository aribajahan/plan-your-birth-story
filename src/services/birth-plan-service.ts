import { supabase } from "@/integrations/supabase/client";
import type { BirthPlanData } from "@/components/BirthPlanWizard";
import type { Database } from "@/integrations/supabase/types";

type BirthPlan = Database['public']['Tables']['birth_plans']['Row'];
type BirthPlanInsert = Database['public']['Tables']['birth_plans']['Insert'];
type BirthPlanUpdate = Database['public']['Tables']['birth_plans']['Update'];

export class BirthPlanService {
  static async saveBirthPlan(data: BirthPlanData, title?: string): Promise<BirthPlan> {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Generate guest session ID if no user
    const guestSessionId = !user ? `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : null;
    
    const completionPercentage = this.calculateCompletion(data);
    
    const birthPlanInsert: BirthPlanInsert = {
      user_id: user?.id || null,
      guest_session_id: guestSessionId,
      title: title || 'My Birth Plan',
      data: data as any,
      completion_percentage: completionPercentage,
      status: completionPercentage >= 100 ? 'completed' : 'draft'
    };

    const { data: savedPlan, error } = await supabase
      .from('birth_plans')
      .insert(birthPlanInsert)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save birth plan: ${error.message}`);
    }

    return savedPlan;
  }

  static async updateBirthPlan(id: string, data: Partial<BirthPlanData>): Promise<BirthPlan> {
    const completionPercentage = data ? this.calculateCompletion(data as BirthPlanData) : undefined;
    
    const updateData: BirthPlanUpdate = {
      data: data as any,
      completion_percentage: completionPercentage,
      status: completionPercentage && completionPercentage >= 100 ? 'completed' : 'draft',
      updated_at: new Date().toISOString()
    };

    const { data: updatedPlan, error } = await supabase
      .from('birth_plans')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update birth plan: ${error.message}`);
    }

    return updatedPlan;
  }

  static async getBirthPlan(id: string): Promise<BirthPlan | null> {
    const { data, error } = await supabase
      .from('birth_plans')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch birth plan: ${error.message}`);
    }

    return data;
  }

  static async getUserBirthPlans(): Promise<BirthPlan[]> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('birth_plans')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch birth plans: ${error.message}`);
    }

    return data || [];
  }

  static async markAsExported(id: string, exportType: 'pdf' | 'email'): Promise<void> {
    const updateData: BirthPlanUpdate = {
      exported_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('birth_plans')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to mark birth plan as exported: ${error.message}`);
    }
  }

  static async deleteBirthPlan(id: string): Promise<void> {
    const { error } = await supabase
      .from('birth_plans')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete birth plan: ${error.message}`);
    }
  }

  private static calculateCompletion(data: BirthPlanData): number {
    let totalFields = 0;
    let filledFields = 0;

    // Labor preferences (4 fields)
    totalFields += 4;
    if (data.laborPreferences.environment) filledFields++;
    if (data.laborPreferences.positions.length > 0) filledFields++;
    if (data.laborPreferences.mobility) filledFields++;
    if (data.laborPreferences.atmosphere) filledFields++;

    // Pain management (3 fields)
    totalFields += 3;
    if (data.painManagement.approach) filledFields++;
    if (data.painManagement.specificPreferences.length > 0) filledFields++;
    if (data.painManagement.backupPlan) filledFields++;

    // Support team (3 fields)
    totalFields += 3;
    if (data.supportTeam.primarySupport) filledFields++;
    if (data.supportTeam.additionalSupport.length > 0) filledFields++;
    if (data.supportTeam.communicationStyle) filledFields++;

    return Math.round((filledFields / totalFields) * 100);
  }

  static transformToLiveBirthPlan(data: BirthPlanData): any {
    return {
      laborPreferences: {
        title: 'Labor Preferences',
        content: [
          data.laborPreferences.environment && `Preferred environment: ${data.laborPreferences.environment}`,
          data.laborPreferences.positions.length > 0 && `Preferred positions: ${data.laborPreferences.positions.join(', ')}`,
          data.laborPreferences.mobility && `Mobility preferences: ${data.laborPreferences.mobility}`,
          data.laborPreferences.atmosphere && `Atmosphere: ${data.laborPreferences.atmosphere}`
        ].filter(Boolean),
        isComplete: !!(data.laborPreferences.environment || data.laborPreferences.positions.length > 0)
      },
      painManagement: {
        title: 'Pain Management',
        content: [
          data.painManagement.approach && `Approach: ${data.painManagement.approach}`,
          ...data.painManagement.specificPreferences,
          data.painManagement.backupPlan && `Backup plan: ${data.painManagement.backupPlan}`
        ].filter(Boolean),
        isComplete: !!(data.painManagement.approach || data.painManagement.specificPreferences.length > 0)
      },
      supportTeam: {
        title: 'Support Team',
        content: [
          data.supportTeam.primarySupport && `Primary support: ${data.supportTeam.primarySupport}`,
          ...data.supportTeam.additionalSupport,
          data.supportTeam.communicationStyle && `Communication style: ${data.supportTeam.communicationStyle}`
        ].filter(Boolean),
        isComplete: !!(data.supportTeam.primarySupport || data.supportTeam.additionalSupport.length > 0)
      },
      environment: {
        title: 'Birth Environment',
        content: [
          data.laborPreferences.atmosphere && `Atmosphere: ${data.laborPreferences.atmosphere}`,
          data.laborPreferences.environment && `Environment: ${data.laborPreferences.environment}`
        ].filter(Boolean),
        isComplete: !!(data.laborPreferences.atmosphere || data.laborPreferences.environment)
      },
      specialRequests: {
        title: 'Special Requests',
        content: [],
        isComplete: false
      }
    };
  }
}