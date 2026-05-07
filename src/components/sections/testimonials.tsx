import SectionHeading from "@/components/section-heading";
import TestimonialCard from "@/components/testimonial-card";
import { testimonials } from "@/data/experience";

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="Testimonials"
          title="What Clients"
          highlight="Say"
          description="Feedback from people I've had the privilege of working with."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              content={testimonial.content}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
