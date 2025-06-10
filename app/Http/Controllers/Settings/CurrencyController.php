<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Currency\StoreRequest;
use App\Http\Requests\Currency\UpdateRequest;
use App\Models\Currency;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class CurrencyController extends Controller
{
    public function __construct(
        private Currency $model,
        private User $user
    ) {}


    public function index(Request $request): Response
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


    public function store(StoreRequest $request): RedirectResponse
    {
        try {
            $this->model->create($request->getRequested());
            return to_route('currency.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function show($id): Currency
    {
        return $this->model->findOrFail($id);
    }


    public function update(UpdateRequest $request, $id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->update($request->getRequested());
            return to_route('currency.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function destroy($id): RedirectResponse
    {
        try {
            $this->model->findOrFail($id)->delete();
            return to_route('currency.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
