<script>
    import { injectAnalytics } from '@vercel/analytics/sveltekit'
    import { Toaster } from "$lib/components/ui/sonner/index.js";
    import "../app.css"
    
    injectAnalytics()
    
</script>

<Toaster />

<slot>
</slot>