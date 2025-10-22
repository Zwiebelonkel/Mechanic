import AppointmentForm from '@/components/appointment-form';

export default function BookAppointmentPage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-headline font-bold">Book an Appointment</h1>
        <p className="mt-2 text-muted-foreground">
          Fill out the form below to schedule your service. We'll confirm your appointment via email.
        </p>
      </div>
      <AppointmentForm />
    </div>
  );
}
