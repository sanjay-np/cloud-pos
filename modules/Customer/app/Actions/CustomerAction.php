<?php

namespace Modules\Customer\Actions;

use Modules\Customer\Models\Customer;

class CustomerAction
{
    public function search($qry)
    {
        return Customer::where('name', 'like', '%' . $qry . '%')
            ->orWhere('code', 'like', '%' . $qry . '%')
            ->orWhere('phone', 'like', '%' . $qry . '%')
            ->take(10)
            ->get();
    }
}
