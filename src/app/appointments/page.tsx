import AppointmentForm from '@/components/appointment-form';

export default function BookAppointmentPage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-headline font-bold">Einen Termin Buchen</h1>
        <p className="mt-2 text-muted-foreground">
          Füllen Sie das untenstehende Formular aus, um Ihren Service zu planen. Wir bestätigen Ihren Termin per E-Mail.
        </p>
      </div>
      <AppointmentForm />
    </div>
  );
}
