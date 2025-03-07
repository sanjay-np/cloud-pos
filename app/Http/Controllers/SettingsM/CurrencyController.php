<?php

namespace Modules\Setting\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Setting\Http\Requests\Currency\StoreRequest;
use Modules\Setting\Http\Requests\Currency\UpdateRequest;
use Modules\Setting\Models\Currency;

class CurrencyController extends Controller
{
    public function __construct(private Currency $model) {}

    public function index()
    {
        $currencies = $this->model->orderBy('id', 'desc')->paginate(perPage: 10);
        return Inertia::render('Setting::Currency', [
            'currencies' => $currencies
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
