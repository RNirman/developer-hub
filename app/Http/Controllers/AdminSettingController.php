<?php

namespace App\Http\Controllers\Admin;

use App\Models\Setting;
use App\Models\AuditLog;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SettingController
{
    public function index()
    {
        $settings = Setting::all();

        return Inertia::render('AdminSettingsIndex', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $settings = $request->validate([
            'settings' => 'required|array',
            'settings.*.key' => 'required|string',
            'settings.*.value' => 'required',
        ]);

        foreach ($settings['settings'] as $setting) {
            Setting::set($setting['key'], $setting['value']);
            AuditLog::log('update_setting', 'Setting', null, null, "Updated setting: {$setting['key']}");
        }

        return redirect()->back()->with('success', 'Settings updated successfully');
    }
}
