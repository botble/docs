@if (config('services.algolia.key'))
    <div class="form-group search">
        <input type="text" class="form-control" id="search" placeholder="Search the docs...">
        <i class="glyphicon glyphicon-search"></i>
    </div>
@endif
