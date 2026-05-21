import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';

export default function AdminSettingsIndex({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        settings: settings || [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AdminLayout currentRoute="Settings">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white">Application Settings</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                        <div className="space-y-4">
                            {data.settings.map((setting, idx) => (
                                <div key={setting.id || idx}>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        {setting.key}
                                        {setting.description && (
                                            <p className="text-xs text-slate-400 mt-1">{setting.description}</p>
                                        )}
                                    </label>
                                    {setting.type === 'textarea' ? (
                                        <textarea
                                            value={setting.value || ''}
                                            onChange={(e) => {
                                                const newSettings = [...data.settings];
                                                newSettings[idx].value = e.target.value;
                                                setData('settings', newSettings);
                                            }}
                                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rows="4"
                                        />
                                    ) : (
                                        <input
                                            type={setting.type === 'boolean' ? 'checkbox' : 'text'}
                                            value={setting.type === 'boolean' ? '' : setting.value || ''}
                                            checked={setting.type === 'boolean' ? Boolean(setting.value) : false}
                                            onChange={(e) => {
                                                const newSettings = [...data.settings];
                                                newSettings[idx].value =
                                                    setting.type === 'boolean' ? e.target.checked : e.target.value;
                                                setData('settings', newSettings);
                                            }}
                                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}
                                    {errors[`settings.${idx}.value`] && (
                                        <p className="text-red-400 text-sm mt-1">{errors[`settings.${idx}.value`]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium disabled:opacity-50"
                    >
                        <Save size={18} />
                        {processing ? 'Saving...' : 'Save Settings'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
