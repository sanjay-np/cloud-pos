<?php

namespace App\Traits;

trait InertiaResponseTrait
{
    /**
     * Return a success response
     *
     * @param string $message
     * @param mixed|null $data
     * @param int $statusCode
     * @return mixed
     */
    protected function success($message = 'Operation successful', $data = null, $statusCode = 200)
    {
        if (request()->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => $message,
                'data' => $data
            ], $statusCode);
        }

        if ($data) {
            return redirect()
                ->route($data)
                ->with('success', $message);
        }

        return back()->with('success', $message);
    }

    /**
     * Return an error response
     *
     * @param string $message
     * @param mixed|null $data
     * @param int $statusCode
     * @return mixed
     */
    protected function error($message = 'Operation failed', $data = null, $statusCode = 422)
    {
        if (request()->wantsJson()) {
            return response()->json([
                'success' => false,
                'message' => $message,
                'data' => $data
            ], $statusCode);
        }

        return back()->withErrors([
            'error' => $message
        ]);
    }

    /**
     * Return a service response for Inertia
     *
     * @param array $response
     * @param string|null $redirectRoute
     * @return mixed
     */
    protected function handleInertiaResponse(array $response, ?string $redirectRoute = null)
    {
        if (!$response['success']) {
            return $this->error($response['message']);
        }

        return $this->success(
            $response['message'] ?? 'Operation successful',
            $redirectRoute
        );
    }
}
