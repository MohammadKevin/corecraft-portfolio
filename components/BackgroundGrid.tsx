export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-dots opacity-60" />
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-yellow/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent-pink/15 blur-[120px]" />
      <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-accent-cyan/10 blur-[100px]" />
    </div>
  );
}