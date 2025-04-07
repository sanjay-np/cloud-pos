<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Currency\StoreRequest;
use App\Http\Requests\Currency\UpdateRequest;
use App\Models\Currency;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class CurrencyController extends Controller
{
    public function __construct(
        private Currency $model
    ) {}


    public function index(Request $request)
    {
        $currencies = $this->model->query()
            ->orderBy('id', 'desc')
            ->paginate($request->per_page ?? config('pos.per_page'))
            ->withQueryString();

        return Inertia::render('settings/currency/index', [
            'currencies' => Inertia::merge($currencies->items()),
            'pagination' => Arr::except($currencies->toArray(), ['data', 'links'])

        ]);
    }


    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            return to_route('currency.index');
        }
    }


    public function show($id)
    {
        return $this->model->findOrFail($id);
    }


    public function update(UpdateRequest $request, $id)
    {
        $item = $this->model->findOrFail($id)->update($request->getRequested());
        if ($item) {
            return to_route('currency.index');
        }
    }


    public function destroy($id)
    {
        $item = $this->model->findOrFail($id)->delete();
        if ($item) {
            return to_route('currency.index');
        }
    }
}
