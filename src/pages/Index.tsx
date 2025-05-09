import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
    }[] = [];

    // Create stars
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: Math.random() * 0.05,
        vy: Math.random() * 0.05,
        alpha: Math.random() * 0.5 + 0.5,
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        // Move stars
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Twinkle effect
        star.alpha =
          Math.abs(Math.sin(Date.now() * 0.001 + star.x)) * 0.5 + 0.5;
      });
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1A1F2C] text-white overflow-hidden">
      {/* Animated background */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* Hero Section */}
      <div className="relative pt-20 pb-32 px-4 flex flex-col items-center justify-center min-h-[90vh] z-10 text-center">
        <div className="animate-pulse absolute -z-10 w-[50vw] h-[50vw] rounded-full bg-[#9b87f5]/20 blur-[100px]" />

        <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#9b87f5] to-[#33C3F0]">
          HilpClient
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[#9b87f5]">
          Minecraft 1.16.5
        </h2>
        <p className="text-lg mb-8 max-w-2xl text-gray-300">
          Откройте новый уровень игры с нашим премиум-читом для Minecraft.
          Превосходите соперников с помощью расширенных возможностей HilpClient.
        </p>

        <Button
          size="lg"
          className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 hover:scale-105 transition-all text-white px-8 py-6 text-lg rounded-full"
        >
          КУПИТЬ ЗА 250₽ <Icon name="ArrowRight" className="ml-2" />
        </Button>
      </div>

      {/* Features Section */}
      <div className="relative bg-[#1A1F2C]/80 backdrop-blur-sm py-20 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#9b87f5]">
            Особенности HilpClient
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="Swords"
              title="KillAura"
              description="Автоматическая атака противников в радиусе действия с настраиваемыми параметрами."
            />
            <FeatureCard
              icon="Eye"
              title="ESP"
              description="Видите игроков, мобов и ресурсы через стены на большом расстоянии."
            />
            <FeatureCard
              icon="Shield"
              title="Антидетект"
              description="Встроенная защита обходит большинство систем обнаружения читов."
            />
            <FeatureCard
              icon="Zap"
              title="Speed"
              description="Перемещайтесь быстрее обычных игроков с настраиваемой скоростью."
            />
            <FeatureCard
              icon="Sparkles"
              title="Funtime"
              description="Специальные эффекты и улучшения для более интересного игрового процесса."
            />
            <FeatureCard
              icon="Globe"
              title="Reallyworld"
              description="Расширенные возможности взаимодействия с окружающим миром Minecraft."
            />
          </div>
        </div>
      </div>

      {/* Showcase Section */}
      <div className="relative py-20 px-4 z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#9b87f5]">
            HilpClient в действии
          </h2>

          <div className="relative h-80 md:h-[500px] w-full rounded-2xl overflow-hidden border-2 border-[#7E69AB]/50 shadow-lg shadow-[#9b87f5]/30">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1F2C] opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8 backdrop-blur-lg bg-black/20 rounded-lg">
                <Icon
                  name="Image"
                  size={80}
                  className="mx-auto mb-4 text-[#9b87f5]"
                />
                <p className="text-lg text-white">
                  Скриншот интерфейса HilpClient
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-[#9b87f5]">
            Готовы поднять свою игру на новый уровень?
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            Получите HilpClient сегодня и доминируйте в Minecraft 1.16.5
          </p>

          <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 border border-[#7E69AB]/30 mb-8">
            <h3 className="text-2xl font-bold mb-2">HilpClient Premium</h3>
            <div className="text-5xl font-bold mb-4 text-[#33C3F0]">250₽</div>
            <ul className="space-y-2 text-left max-w-xs mx-auto mb-6">
              <li className="flex items-center">
                <Icon name="Check" className="mr-2 text-[#9b87f5]" />
                <span>Пожизненный доступ</span>
              </li>
              <li className="flex items-center">
                <Icon name="Check" className="mr-2 text-[#9b87f5]" />
                <span>Все функции разблокированы</span>
              </li>
              <li className="flex items-center">
                <Icon name="Check" className="mr-2 text-[#9b87f5]" />
                <span>Регулярные обновления</span>
              </li>
              <li className="flex items-center">
                <Icon name="Check" className="mr-2 text-[#9b87f5]" />
                <span>Техподдержка</span>
              </li>
            </ul>

            <Button
              size="lg"
              className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 hover:scale-105 transition-all text-white px-10 py-6 text-lg rounded-full"
            >
              КУПИТЬ СЕЙЧАС
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 backdrop-blur-md text-center py-6">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-gray-400 text-sm">
            © 2025 HilpClient. Все права защищены. Этот продукт предназначен
            исключительно для образовательных целей.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <Card className="bg-black/30 backdrop-blur-sm border-[#7E69AB]/30 hover:border-[#9b87f5]/50 transition-all hover:shadow-lg hover:shadow-[#9b87f5]/20 group">
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-full bg-[#9b87f5]/20 flex items-center justify-center mb-4 group-hover:bg-[#9b87f5]/30 transition-all">
          <Icon name={icon} className="text-[#9b87f5]" size={24} />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Index;
