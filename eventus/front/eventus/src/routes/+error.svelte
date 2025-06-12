<script>
    let sitetitle = page.status + " " + page.error?.message;
    import { page } from "$app/state";

</script>

<title>{sitetitle}</title>

<div>
    <h1>{page.status}</h1>
    <h1>{page.error?.message}</h1>
    <a href="/">Return to home page</a>
</div>