import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface SavedState {
  messages: any[];
  userPreferences: any;
  birthPlanData: any;
  discussedTopics: any;
  completion: number;
  updatedAt: string;
}

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Login or Create Account - Birth Plan";

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // Defer to avoid deadlocks
        setTimeout(async () => {
          await migrateLocalPlan();
          navigate("/");
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const migrateLocalPlan = async () => {
    try {
      const ls = localStorage.getItem('bp_chat_state');
      if (!ls) return;
      const saved: SavedState = JSON.parse(ls);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const status = saved.completion >= 100 ? 'completed' : saved.completion > 0 ? 'in_progress' : 'draft';

      const { error } = await supabase.from('birth_plans').insert({
        user_id: user.id,
        title: 'My Birth Plan',
        data: {
          userPreferences: saved.userPreferences,
          discussedTopics: saved.discussedTopics,
          birthPlanData: saved.birthPlanData,
          messages: saved.messages?.slice?.(-50) || [],
        },
        status,
        completion_percentage: Math.round(saved.completion),
      });

      if (error) {
        console.error('Failed to migrate plan', error);
        toast({ title: 'Could not save to account', description: 'You are signed in, but we could not migrate your local plan yet.' });
        return;
      }

      localStorage.setItem('bp_migrated', '1');
      toast({ title: 'Plan saved to your account', description: 'Your progress is now synced.' });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl }
      });
      if (error) throw error;
      toast({ title: 'Check your email', description: 'Confirm your email to complete signup.' });
    } catch (e: any) {
      toast({ title: 'Signup error', description: e.message || 'Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // onAuthStateChange will redirect
    } catch (e: any) {
      toast({ title: 'Login error', description: e.message || 'Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</CardTitle>
          <CardDescription>Save your progress and sync across devices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button disabled={loading} className="w-full" onClick={mode === 'signup' ? handleSignup : handleLogin}>
              {loading ? 'Please wait…' : mode === 'signup' ? 'Sign up' : 'Log in'}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              {mode === 'signup' ? (
                <>Already have an account? <button className="text-primary underline" onClick={() => setMode('login')}>Log in</button></>
              ) : (
                <>New here? <button className="text-primary underline" onClick={() => setMode('signup')}>Create an account</button></>
              )}
            </p>
            <p className="text-xs text-muted-foreground text-center">
              <Link to="/" className="underline">Back to home</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
