@if (config('algolia.connections.main.search_key'))
    <div class="form-group search">
        <input type="text" class="form-control" id="search" placeholder="Search the docs...">
        <i class="glyphicon glyphicon-search"></i>
    </div>
@endif
