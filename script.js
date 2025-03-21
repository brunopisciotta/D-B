 // -------------- Funções para o Carrossel

 document.addEventListener('DOMContentLoaded', function() {
    const driveImageIds = [
        "16z3vSiUgGCT8pTrBwLTQkrX4PG4D4WOr", // Exemplo do ID que você forneceu
        // Adicione os demais IDs, por exemplo:
        "1eXlnRw7E1iZZLiu2L1Z6a9H4S8a8x3_S",
        "1Bwf9kQ90EA4S8yOcJG8qKDKNaK95d6sz",
        "1J-ikzs76TRojOQ_Bh9HF5drS4geRijje"
        // ... até completar todas as suas imagens
    ];
    
    function loadDailyPhotos() {
        // Usar o dia atual como seed para randomização
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        
        // Inicializar o gerador de números aleatórios com a seed
        if (typeof Math.seedrandom === 'function') {
            Math.seedrandom(seed);
        } else {
            console.warn("Math.seedrandom não está definido. As imagens serão aleatórias a cada carregamento.");
        }
        
        const carouselContainer = document.querySelector('.carousel-container');
        // Limpar o conteúdo atual
        carouselContainer.innerHTML = '';
        
        // Selecionar 3 imagens aleatórias com base na seed do dia
        const selectedImageIndexes = [];
        while (selectedImageIndexes.length < 3 && selectedImageIndexes.length < driveImageIds.length) {
            const randomIndex = Math.floor(Math.random() * driveImageIds.length);
            if (!selectedImageIndexes.includes(randomIndex)) {
                selectedImageIndexes.push(randomIndex);
            }
        }
        
        // Criar slides com HTML direto 
        for (let i = 0; i < selectedImageIndexes.length; i++) {
            const index = selectedImageIndexes[i];
            const slideHtml = `
                <div class="carousel-slide">
                    <div class="iframe-container">
                        <iframe src="https://drive.google.com/file/d/${driveImageIds[index]}/preview" 
                                allow="autoplay" 
                                frameborder="0">
                        </iframe>
                    </div>
                </div>
            `;
            carouselContainer.innerHTML += slideHtml;
        }
        
        // Adicionar botões de navegação usando HTML direto
        carouselContainer.innerHTML += `
            <button class="prev-button">❮</button>
            <button class="next-button">❯</button>
        `;
        
        // Inicializar o carrossel
        initializeCarousel();
    }

    // Função para inicializar o carrossel
    function initializeCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        let currentIndex = 0;

        // Verificar se existem slides
        if (slides.length === 0) {
            console.error("Nenhum slide encontrado para inicializar o carrossel");
            return;
        }

        // Função para mostrar um slide específico
        function showSlide(index) {
            // Esconder todos os slides
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
            // Mostrar apenas o slide atual
            slides[index].style.display = 'block';
        }

        // Navegação para o próximo slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        // Navegação para o slide anterior
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        // Adicionar listeners para os botões
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        // Mostrar o primeiro slide
        showSlide(currentIndex);
    }

    // Carregar as fotos ao inicializar a página
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
            greetingMessageText = "Sei que vai arrasar no seu dia!"; 
            greetingTextElement.classList.add('morning');
        } else if (hour >= 12 && hour < 18) {
            greetingMessage = 'Boa tarde, ';
            greetingComplement = 'meu bem!';
            animationColor = '#FFD700';
            greetingMessageText = "Metade do dia já foi, vamos vencer o resto!"; 
            greetingTextElement.classList.add('afternoon');
        } else if (hour >= 18 && hour < 22) {
            greetingMessage = 'Boa noite, ';
            greetingComplement = 'minha flor!';
            animationColor = '#663399';
            greetingMessageText = "Uffa, dia quase acabando";
            greetingTextElement.classList.add('evening');
        } else {
            greetingMessage = 'Boa noite, ';
            greetingComplement = 'meu bb!';
            animationColor = '#FFFFFF';
            greetingMessageText = "Agora é só descansar, parabéns por vencer mais um dia!";
            greetingTextElement.classList.add('night');
        }

        // Limpa os elementos antes de iniciar a animação
        greetingTextElement.textContent = '';
        greetingComplementElement.textContent = '';
        greetingMessageElement.textContent = '';

        // Aplica o efeito de digitação para a primeira parte da saudação
        typeWriter(greetingTextElement, greetingMessage, 0, 100, function() {
            // Após terminar a primeira parte, começa a segunda
            typeWriter(greetingComplementElement, greetingComplement, 0, 20, function() {
                // Após terminar a segunda parte, começa a mensagem
                typeWriter(greetingMessageElement, greetingMessageText, 0, 30);
            });
        });

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

    // Função para criar o efeito de digitação
    function typeWriter(element, text, index, speed, callback) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(function() {
                4
                typeWriter(element, text, index, speed, callback);
            }, speed);
        } else if (callback) {
            setTimeout(callback, 300); // Pequena pausa antes de iniciar a próxima parte
        }
    }

    updateGreeting(); // Atualiza a mensagem e as animações na inicialização
    // Atualiza a cada 5 minutos em vez de a cada minuto para evitar interrupções frequentes do efeito
    setInterval(updateGreeting, 300000);

     // Lista de URLs dos vídeos
     const videoUrls = [
        "https://www.youtube.com/embed/6pi3DJILhYA?si=fyOasq-KdjkmXhC9",
        "https://www.youtube.com/embed/QRLPk3ZNxwE?si=z_4oKh4j79VW2BGY",
        "https://www.youtube.com/embed/dgOc8SVqsKw?si=015otXnBj-jfYJ2x",
        "https://www.youtube.com/embed/-DA3ViA5Ypw?si=hi0s5hRzJHGmhsLi",
        "https://www.youtube.com/embed/vnUl9Gi6jTI?si=3GY2v9zBtu9SPmBW",
        "https://www.youtube.com/embed/K8oI19CrlA0?si=BeQ-dbP4oS0ROxpu",
    ];

    // -------------- Vídeo diário
    function selectDailyVideo() {
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        const randomIndex = seed % videoUrls.length; // Garante um índice dentro do array

        return videoUrls[randomIndex];
    }

    // Atualizar o iframe
    const videoSrc = selectDailyVideo();
    document.getElementById('youtube-video').src = videoSrc;


    // -------------- Frases romanticas
    const romanticPhrases = [
        "'Desde que te conheci, minha vida se transformou em um filme romântico, daqueles que a gente ama assistir juntinho no sofá. Você é a protagonista dos meus sonhos e a razão do meu sorriso mais sincero.' ",
        "'Lembro como se fosse hoje do nosso primeiro encontro. Aquele dia mágico em que o tempo parou e eu tive a certeza de que você era a pessoa certa para mim. Mal sabia eu que a nossa história seria ainda mais incrível do que eu imaginava.'",
        "'Com você, aprendi o verdadeiro significado do amor. Aquele sentimento puro, leve e intenso que me faz querer ser a melhor versão de mim mesmo todos os dias. Obrigado por me amar e me inspirar a ser feliz.'",
        "'Seu sorriso ilumina meus dias como o sol da manhã. Seus olhos transmitem a paz que acalma minha alma. Seu amor me completa e me faz sentir o homem mais sortudo do mundo.'",
        "'Nossa história de amor é a minha favorita. Cada capítulo é escrito com carinho, respeito e admiração. Que a gente continue construindo juntos um futuro repleto de momentos inesquecíveis.'",
        "'Você é a minha musa, a minha inspiração, o meu porto seguro. Ao seu lado, me sinto invencível e capaz de conquistar todos os meus sonhos. Te amo mais do que as palavras podem expressar.'",
        "'Se o amor fosse um jogo, você seria a minha vitória mais importante. Ao seu lado, me sinto um campeão da felicidade. Obrigado por me fazer sorrir todos os dias, meu amor!'",
        "'Dizem que o amor é cego, mas eu discordo. Com você, enxergo a vida com mais clareza e beleza. Obrigado por me mostrar o lado bom da vida, meu amor!'",
        "'Cada detalhe seu me encanta, desde o seu sorriso até o jeito que você arruma o cabelo. Você é a minha obra de arte favorita.'",
        "'Nossos momentos juntos são como estrelas cadentes: raros e mágicos. Mal posso esperar para criar ainda mais memórias ao seu lado.'",
        "'Você me ensinou que o amor não precisa ser perfeito, ele só precisa ser verdadeiro. E o nosso amor é o mais verdadeiro que eu já conheci.'",
        "'Seu amor é o meu combustível, a força que me impulsiona a seguir em frente. Ao seu lado, me sinto capaz de tudo.'",
        "'Você é a melodia que embala os meus sonhos, a poesia que inspira os meus versos, a luz que guia os meus passos.'",
        "'Nosso amor é como um jardim florido, que a cada dia se torna mais belo e perfumado. Que a gente continue cultivando esse amor com carinho e dedicação.'",
        "'Você é a minha pessoa favorita no mundo todo, e eu não trocaria nenhum segundo ao seu lado por nada nesse mundo.'",
        // mais frases
    ];

    // Função para selecionar a frase diária
    function selectDailyPhrase() {
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        const randomIndex = seed % romanticPhrases.length; // Garante um índice dentro do array

        return romanticPhrases[randomIndex];
    }

    // Atualizar o elemento HTML com a frase diária
    const dailyPhrase = selectDailyPhrase();
    document.getElementById('daily-phrase').textContent = dailyPhrase;
});
