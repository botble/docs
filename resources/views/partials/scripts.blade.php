<script>
    window.algoliaApi = {
        key: '{{ config('services.algolia.key') }}',
        index: '{{ config('services.algolia.index') }}'
    };
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.pjax/1.9.6/jquery.pjax.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.js"></script>
<script src="{{ elixir('js/app.js') }}"></script>
