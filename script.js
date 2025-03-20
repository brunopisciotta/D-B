 // -------------- Funções para os Slides

 document.addEventListener('DOMContentLoaded', function() {
    function loadDailyPhotos() {
        const imageDirectory = 'assets/carrossel/';
        const numberOfImages = 37; // Atualizado para 37 conforme seu comentário
        const numberOfSlides = 3;
        const extensions = ['.jpeg', '.jpg', '.png', '.webp'];

        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        
        // Adicionar a biblioteca seedrandom se ela não estiver incluída
        if (typeof Math.seedrandom !== 'function') {
            console.warn("Math.seedrandom não está definido. As imagens serão aleatórias a cada carregamento.");
        } else {
            Math.seedrandom(seed);
        }

        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.innerHTML = '';

        for (let i = 0; i < numberOfSlides; i++) {
            let randomIndex = Math.floor(Math.random() * numberOfImages) + 1;
            let imageLoaded = false;

            const slide = document.createElement('div');
            slide.classList.add('carousel-slide');
            
            // Tentar cada extensão possível
            for (let j = 0; j < extensions.length && !imageLoaded; j++) {
                const imagePath = `${imageDirectory}img (${randomIndex})${extensions[j]}`;  // Com espaço
                
                // Cria o elemento de imagem
                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = `Imagem ${randomIndex}`;
                
                // Adiciona evento para verificar se a imagem carregou
                img.onload = function() {
                    imageLoaded = true;
                    slide.appendChild(img);
                };
                
                img.onerror = function() {
                    // Tenta a próxima extensão se esta falhar
                    console.log(`Imagem não encontrada: ${imagePath}`);
                };
                
                // Tenta carregar a imagem
                img.src = imagePath;
            }
            
            // Adiciona um fallback para caso nenhuma imagem seja carregada
            setTimeout(function() {
                if (!imageLoaded) {
                    slide.innerHTML = `<p>Imagem não encontrada</p>`;
                }
                carouselContainer.appendChild(slide);
            }, 500);
        }

        // Adiciona os botões de navegação após tentar carregar todas as imagens
        setTimeout(function() {
            const prevButton = document.createElement('button');
            prevButton.classList.add('prev-button');
            prevButton.innerHTML = '❮';
            
            const nextButton = document.createElement('button');
            nextButton.classList.add('next-button');
            nextButton.innerHTML = '❯';
            
            carouselContainer.appendChild(prevButton);
            carouselContainer.appendChild(nextButton);
            
            initializeCarousel();
        }, 600);
    }

    // Função de inicialização do carrossel
    function initializeCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        let currentIndex = 0;

        // Se não houver slides, não inicializa o carrossel
        if (slides.length === 0) {
            console.error("Nenhum slide encontrado para inicializar o carrossel");
            return;
        }

        function showSlide(index) {
            slides.forEach(slide => slide.style.display = 'none');
            slides[index].style.display = 'block';
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        showSlide(currentIndex);
    }

    // Carrega as fotos diárias na inicialização
    loadDailyPhotos();


    // -------------- Funções para os Timers

    const timer1Element = document.getElementById('timer1');
    const timer2Element = document.getElementById('timer2');

    const startDate1 = new Date('2020-02-28T00:00:00');
    const startDate2 = new Date('2021-02-24T00:00:00');

    function updateTimer(element, startDate) {
        function update() {
            const now = new Date();
            const difference = now.getTime() - startDate.getTime();

            if (difference > 0) {
                const secondsTotal = Math.floor(difference / 1000);
                const years = Math.floor(secondsTotal / (60 * 60 * 24 * 365.25));
                const remainingAfterYears = secondsTotal % (60 * 60 * 24 * 365.25);
                const days = Math.floor(remainingAfterYears / (60 * 60 * 24));
                const remainingAfterDays = remainingAfterYears % (60 * 60 * 24);
                const hours = Math.floor(remainingAfterDays / (60 * 60));
                const remainingAfterHours = remainingAfterDays % (60 * 60);
                const minutes = Math.floor(remainingAfterHours / 60);
                const seconds = remainingAfterHours % 60;

                element.textContent = `${years} ano(s), ${days} dia(s), ${hours} hora(s), ${minutes} minuto(s) e ${seconds} segundo(s)`;
            } else {
                element.textContent = 'Ainda não começou.';
            }
        }

        update();
        setInterval(update, 1000);
    }

    updateTimer(timer1Element, startDate1);
    updateTimer(timer2Element, startDate2);


     // -------------- Funções para o Bom dia


    // Mensagem de boas-vindas e ajuste de degradê
    function updateGreeting() {
        const now = new Date();
        const hour = now.getHours();
        const greetingElement = document.getElementById('greeting');
        const greetingTextElement = greetingElement.querySelector('.greeting-text');
        const greetingComplementElement = greetingElement.querySelector('.greeting-complement');
        const animationsContainer = document.querySelector('.animations-container');
        const greetingMessageElement = document.querySelector('.greeting-message');

        let greetingMessage = '';
        let greetingComplement = '';
        let animationColor = '';
        let animationCount = 15; 

        // Limpa as animações existentes
        animationsContainer.innerHTML = '';

        if (hour >= 6 && hour < 12) {
            greetingMessage = 'Bom dia, ';
            greetingComplement = 'meu amor!';
            animationColor = '#87CEEB';
            greetingMessageElement.textContent = "Sei que vai arrasar no seu dia!"; 
            greetingTextElement.classList.add('morning');
        } else if (hour >= 12 && hour < 18) {
            greetingMessage = 'Boa tarde, ';
            greetingComplement = 'meu bem!';
            animationColor = '#FFD700';
            greetingMessageElement.textContent = "'Metade do dia já foi, vamos vencer o resto!'"; 
            greetingTextElement.classList.add('afternoon');
        } else if (hour >= 18 && hour < 22) {
            greetingMessage = 'Boa noite, ';
            greetingComplement = 'minha flor!';
            animationColor = '#663399';
            greetingMessageElement.textContent = "Uffa, dia quase acabando";
            greetingTextElement.classList.add('evening');
        } else {
            greetingMessage = 'Boa noite, ';
            greetingComplement = 'meu bb!';
            animationColor = '#FFFFFF';
            greetingMessageElement.textContent = "Agora é só descansar, parabéns por vencer mais um dia!";
            greetingTextElement.classList.add('night');
        }

        greetingTextElement.textContent = greetingMessage;
        greetingComplementElement.textContent = greetingComplement;

        // Cria as animações dinamicamente
        for (let i = 0; i < animationCount; i++) {
            const animationElement = document.createElement('div');
            animationElement.classList.add('floating-animation');
            animationElement.style.backgroundColor = animationColor;

            // Lados aleatórios
            const side = Math.random() < 0.5 ? 'left' : 'right';
            animationElement.style[side] = Math.random() * 20 + 5 + '%'; // Entre 5% e 25% da lateral

            // Altura aleatória
            const randomY = Math.random() * 80 + 10; // Entre 10% e 90%
            animationElement.style.top = `${randomY}%`;

            // Tamanho aleatório
            const randomSize = Math.random() * 20 + 10; // Entre 10px e 30px
            animationElement.style.width = `${randomSize}px`;
            animationElement.style.height = `${randomSize}px`;

            // Animação aleatória
            const animations = ['float', 'pulse', 'rotate', 'twinkle'];
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            animationElement.classList.add(randomAnimation);

            animationsContainer.appendChild(animationElement);
        }
    }

    updateGreeting(); // Atualiza a mensagem e as animações na inicialização
    setInterval(updateGreeting, 60000); // Atualiza a cada minuto

     // Lista de URLs dos vídeos
     const videoUrls = [
        "https://www.youtube.com/embed/6pi3DJILhYA?si=fyOasq-KdjkmXhC9",
        "https://www.youtube.com/embed/QRLPk3ZNxwE?si=z_4oKh4j79VW2BGY",
        "https://www.youtube.com/embed/dgOc8SVqsKw?si=015otXnBj-jfYJ2x",
        "https://www.youtube.com/embed/-DA3ViA5Ypw?si=hi0s5hRzJHGmhsLi",
        "https://www.youtube.com/embed/vnUl9Gi6jTI?si=3GY2v9zBtu9SPmBW",
        "https://www.youtube.com/embed/K8oI19CrlA0?si=BeQ-dbP4oS0ROxpu",
    ];

    // Função para selecionar o vídeo diário
    function selectDailyVideo() {
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        const randomIndex = seed % videoUrls.length; // Garante um índice dentro do array

        return videoUrls[randomIndex];
    }

    // Atualizar o iframe
    const videoSrc = selectDailyVideo();
    document.getElementById('youtube-video').src = videoSrc;
});





