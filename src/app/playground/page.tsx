import Hero from '@/components/hero/Hero';

export default function PlaygroundPage() {
  return (
    <main>
      <Hero />
      <div className="h-[200vh] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-400">Scroll content to test interactions</p>
      </div>
    </main>
  );
}
