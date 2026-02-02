# 🔧 Quick Fix for Supabase Upload Error

## Problem: "new row violates row-level security policy"

## Solution: Create Upload Policy in Supabase Dashboard

### Step 1: Go to Supabase Dashboard
1. Visit: https://supabase.com/dashboard
2. Select your project: `axaepxurdgoebzmmrbxd`

### Step 2: Create Upload Policy
1. Go to **Storage** (left sidebar)
2. Click **Policies** tab
3. Click **"New Policy"**
4. Fill in:
   - **Policy Name**: `Allow Uploads`
   - **Allowed Operation**: `INSERT`
   - **Target Roles**: `anon, authenticated`
   - **Policy Definition**: `bucket_id = 'product-images'`
5. Click **"Save"**

### Step 3: Test Upload
1. Go to: http://localhost:3000/upload
2. Upload any image
3. Should work now!

### Alternative: Disable RLS (Quick Fix)
If policies don't work, disable RLS:

1. Go to **SQL Editor** in Supabase
2. Run: `ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;`

### Why This Happens
- Your bucket has Row Level Security enabled
- No policies allow uploads
- Service role key should bypass, but sometimes doesn't work properly

### Which to Choose?
✅ **Create Policy** - More secure, recommended  
✅ **Disable RLS** - Quick fix, less secure  

**Try the policy first - it's the proper solution!** 🚀
