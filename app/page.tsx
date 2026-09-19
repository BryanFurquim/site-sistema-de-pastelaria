"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SitePreloader } from "@/components/site-preloader";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";

const defaultProducts = [
  ["Carne", "Carne temperada.", "R$ 12,00"],
  ["Carne c/Ovo", "Carne e ovo.", "R$ 13,00"],
  ["Carne c/Queijo", "Carne e queijo.", "R$ 13,00"],
  ["Carne c/Cheddar", "Carne e cheddar.", "R$ 13,00"],
  ["Carne c/Requeijão", "Carne e requeijão.", "R$ 13,00"],
  ["Carne c/Ovo e Queijo", "Carne, ovo e queijo.", "R$ 14,00"],
  ["Carne c/Bacon", "Carne e bacon.", "R$ 15,00"],
  ["Carne c/Bacon e Queijo", "Carne, bacon e queijo.", "R$ 17,00"],
  ["Carne c/Bacon e Requeijão", "Carne, bacon e requeijão.", "R$ 17,00"],
  ["Frango", "Frango temperado.", "R$ 12,00"],
  ["Frango c/Queijo", "Frango e queijo.", "R$ 13,00"],
  ["Frango c/Cheddar", "Frango e cheddar.", "R$ 13,00"],
  ["Frango c/Requeijão", "Frango e requeijão.", "R$ 13,00"],
  ["Frango c/Calabresa", "Frango e calabresa.", "R$ 13,00"],
  ["Frango c/Milho", "Frango e milho.", "R$ 13,00"],
  ["Frango c/Milho e Queijo", "Frango, milho e queijo.", "R$ 14,00"],
  ["Frango c/Bacon", "Frango e bacon.", "R$ 15,00"],
  ["Frango c/Bacon e Queijo", "Frango, bacon e queijo.", "R$ 17,00"],
  ["Frango c/Bacon e Requeijão", "Frango, bacon e requeijão.", "R$ 17,00"],
  ["Pizza", "Queijo, presunto e tomate.", "R$ 13,00"],
  ["Pizza c/Ovo", "Pizza e ovo.", "R$ 14,00"],
  ["Pizza c/Cheddar", "Pizza e cheddar.", "R$ 14,00"],
  ["Pizza c/Requeijão", "Pizza e requeijão.", "R$ 14,00"],
  ["Pizza c/Bacon", "Pizza e bacon.", "R$ 16,00"],
  ["Pizza c/Bacon e Requeijão", "Pizza, bacon e requeijão.", "R$ 17,00"],
  ["Calabresa", "Calabresa temperada.", "R$ 12,00"],
  ["Calabresa c/Queijo", "Calabresa e queijo.", "R$ 13,00"],
  ["Calabresa c/Cheddar", "Calabresa e cheddar.", "R$ 13,00"],
  ["Calabresa c/Requeijão", "Calabresa e requeijão.", "R$ 13,00"],
  ["Calabresa c/Bacon", "Calabresa e bacon.", "R$ 15,00"],
  ["Calabresa c/Bacon e Queijo", "Calabresa, bacon e queijo.", "R$ 17,00"],
  [
    "Calabresa c/Bacon e Requeijão",
    "Calabresa, bacon e requeijão.",
    "R$ 17,00",
  ],
  ["Queijo", "Queijo derretido.", "R$ 12,00"],
  ["Queijo c/Ovo", "Queijo e ovo.", "R$ 13,00"],
  ["Queijo c/Cheddar", "Queijo e cheddar.", "R$ 13,00"],
  ["Queijo c/Requeijão", "Queijo e requeijão.", "R$ 13,00"],
  ["Queijo c/Bacon", "Queijo e bacon.", "R$ 15,00"],
  ["Queijo c/Bacon e Requeijão", "Queijo, bacon e requeijão.", "R$ 17,00"],
  ["Três Queijos", "Blend de três queijos.", "R$ 17,00"],
  ["Palmito", "Palmito temperado.", "R$ 13,00"],
  ["Palmito c/Queijo", "Palmito e queijo.", "R$ 14,00"],
  ["Palmito c/Cheddar", "Palmito e cheddar.", "R$ 14,00"],
  ["Palmito c/Requeijão", "Palmito e requeijão.", "R$ 14,00"],
  ["Palmito c/Bacon", "Palmito e bacon.", "R$ 16,00"],
  ["Palmito c/Bacon e Queijo", "Palmito, bacon e queijo.", "R$ 17,00"],
  ["Palmito c/Bacon e Requeijão", "Palmito, bacon e requeijão.", "R$ 17,00"],
  ["Brócolis", "Brócolis temperado.", "R$ 12,00"],
  ["Brócolis c/Queijo", "Brócolis e queijo.", "R$ 13,00"],
  ["Brócolis c/Cheddar", "Brócolis e cheddar.", "R$ 13,00"],
  ["Brócolis c/Requeijão", "Brócolis e requeijão.", "R$ 13,00"],
  ["Brócolis c/Bacon", "Brócolis e bacon.", "R$ 15,00"],
  ["Brócolis c/Bacon e Queijo", "Brócolis, bacon e queijo.", "R$ 17,00"],
  ["Brócolis c/Bacon e Requeijão", "Brócolis, bacon e requeijão.", "R$ 17,00"],
  ["Prestígio", "Chocolate e coco.", "R$ 13,00"],
  ["Brigadeiro", "Brigadeiro cremoso.", "R$ 13,00"],
  ["Romeu e Julieta", "Queijo e goiabada.", "R$ 13,00"],
  ["Sonho de Valsa", "Chocolate e bombom.", "R$ 13,00"],
  ["Ouro Branco", "Chocolate e bombom.", "R$ 13,00"],
  ["Brigadeiro c/Ouro Branco", "Brigadeiro e Ouro Branco.", "R$ 16,00"],
  ["Suflair", "Chocolate Suflair.", "R$ 15,00"],
  ["Suflair c/Ouro Branco", "Suflair e Ouro Branco.", "R$ 17,00"],
  ["Fritas", "Porção de fritas.", "R$ 25,00"],
  ["Fritas c/Cheddar e Bacon", "Fritas, cheddar e bacon.", "R$ 35,00"],
  ["Anéis de Cebola", "Porção de anéis de cebola.", "R$ 25,00"],
  ["Anéis de Cebola c/Cheddar e Bacon", "Anéis, cheddar e bacon.", "R$ 35,00"],
  ["Coca-Cola Lata 350ml", "Refrigerante gelado.", "R$ 7,00"],
  ["Coca-Cola Zero Lata 350ml", "Refrigerante gelado.", "R$ 7,00"],
  ["Guaraná Antarctica Lata 350ml", "Refrigerante gelado.", "R$ 7,00"],
  ["Fanta-Uva Lata 350ml", "Refrigerante gelado.", "R$ 7,00"],
  ["Fanta-Laranja Lata 350ml", "Refrigerante gelado.", "R$ 7,00"],
  ["Sprite Lata 350ml", "Refrigerante gelado.", "R$ 7,00"],
  ["Coca-Cola 2 litros", "Refrigerante família.", "R$ 17,00"],
  ["Laranja Natural", "Suco natural.", "R$ 6,00"],
  ["Del Valle Uva", "Suco Del Valle.", "R$ 7,00"],
  ["Del Valle Goiaba", "Suco Del Valle.", "R$ 7,00"],
  ["Del Valle Pêssego", "Suco Del Valle.", "R$ 7,00"],
  ["Água sem Gás", "Água mineral.", "R$ 3,00"],
  ["Água com Gás", "Água mineral.", "R$ 4,50"],
  ["Água Tônica", "Bebida gelada.", "R$ 7,00"],
  ["Brahma", "Cerveja gelada.", "R$ 7,00"],
  ["Skol", "Cerveja gelada.", "R$ 7,00"],
  ["Império", "Cerveja gelada.", "R$ 7,00"],
  ["Heineken", "Cerveja gelada.", "R$ 9,00"],
];

export default function Page() {
  const [menu, setMenu] = useState(false);
  const [catalogProducts, setCatalogProducts] = useState(defaultProducts);
  const [activeCategory, setActiveCategory] = useState("salgados");
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("name,description,price,category,subcategory,image_url")
      .eq("active", true)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data?.length) {
          const databaseProducts = data.map(
            (product) =>
              [
                product.name,
                product.description,
                `R$ ${Number(product.price).toFixed(2).replace(".", ",")}`,
                product.category,
                product.subcategory,
                product.image_url,
              ] as string[],
          );
          const databaseNames = new Set(databaseProducts.map(([name]) => name));
          setCatalogProducts([
            ...databaseProducts,
            ...defaultProducts.filter(([name]) => !databaseNames.has(name)),
          ]);
        }
      });
  }, []);
  const [heroFlavor, setHeroFlavor] = useState(0);
  const heroSlides = [
    {
      name: "Sensação",
      description: "Chocolate cremoso com morangos frescos em cada mordida.",
      image: "/products/hero-chocolate.png",
      color: "#F5C518",
    },
    {
      name: "Carne com Queijo",
      description: "Carne temperada com queijo derretido.",
      image: "/products/hero-carne.png",
      color: "#F5C518",
    },
    {
      name: "Frango com Requeijão",
      description: "Frango cremoso com requeijão.",
      image: "/products/hero-frango.png",
      color: "#F5C518",
    },
    {
      name: "Pizza",
      description: "Queijo, presunto e tomate dentro de uma massa crocante.",
      image: "/products/hero-presunto.png",
      color: "#F5C518",
    },
    {
      name: "Calabresa com Cheddar",
      description: "Calabresa fatiada com cheddar cremoso.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8awRYemgEjovbzA6iSFi5A9YsNcSBN.png",
      color: "#F5C518",
    },
    {
      name: "Brócolis com Queijo e Bacon",
      description: "Brócolis, queijo e bacon em uma combinação especial.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TgWUHfwAiLNPcnTo7OzhVnaSErBf73.png",
      color: "#F5C518",
    },
    {
      name: "Queijo com Bacon",
      description: "Queijo derretido com bacon crocante.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kWNAmpyIjS4NtgCt3Qzp0K2VilM4gT.png",
      color: "#F5C518",
    },
    {
      name: "Palmito com Queijo e Bacon",
      description: "Palmito cremoso com queijo e bacon.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lAHpL7wXqFZDcqkMF1LtIlspfDKOBe.png",
      color: "#F5C518",
    },
    {
      name: "Batata com Cheddar e Bacon",
      description: "Porção de batatas com cheddar e bacon crocante.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-O8PKOpi7JXtfReuP32a81chr378odt.png",
      color: "#F5C518",
    },
    {
      name: "Anéis de Cebola com Cheddar e Bacon",
      description: "Anéis crocantes cobertos com cheddar e bacon.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SkjrybCLM4kI4HgnwANQfO07KKUAwg.png",
      color: "#F5C518",
    },
  ];
  const currentHero = heroSlides[heroFlavor];
  useEffect(() => {
    const preload = (src: string) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
    };
    const preloadVisibleSlides = () => heroSlides.slice(0, 4).forEach((slide) => preload(slide.image));
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(preloadVisibleSlides);
    } else {
      window.setTimeout(preloadVisibleSlides, 0);
    }
  }, []);
  const [activeSavory, setActiveSavory] = useState("Carne");
  const [cart, setCart] = useState<string[]>([]);
  const [checkout, setCheckout] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [notificationPreference, setNotificationPreference] =
    useState("aguardar");
  const [formError, setFormError] = useState("");
  const [customerComment, setCustomerComment] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSent, setReviewSent] = useState(false);
  const formatPhone = (value: string) => value.replace(/\D/g, "").slice(0, 11);
  const isValidBrazilPhone = (value: string) =>
    /^\d{2}9\d{8}$/.test(formatPhone(value));
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const priceByName = Object.fromEntries(
    catalogProducts.map(([name, , price]) => [
      name,
      Number(price.replace("R$ ", "").replace(",", ".")),
    ]),
  );
  const total = useMemo(
    () => cart.reduce((sum, name) => sum + (priceByName[name] || 0), 0),
    [cart],
  );
  const cartItems = useMemo(
    () =>
      Object.entries(
        cart.reduce<Record<string, number>>(
          (acc, name) => ({ ...acc, [name]: (acc[name] || 0) + 1 }),
          {},
        ),
      ),
    [cart],
  );
  const removeFromCart = (name: string) =>
    setCart((current) => {
      const index = current.indexOf(name);
      return index === -1
        ? current
        : [...current.slice(0, index), ...current.slice(index + 1)];
    });
  const addToCart = (name: string) => setCart((current) => [...current, name]);
  const quantityFor = (name: string) =>
    cart.filter((item) => item === name).length;
  const decreaseFromCart = (name: string) =>
    setCart((current) => {
      const index = current.indexOf(name);
      return index === -1
        ? current
        : [...current.slice(0, index), ...current.slice(index + 1)];
    });
  const categoryFor = (name: string) => {
    if (
      [
        "Prestígio",
        "Brigadeiro",
        "Romeu e Julieta",
        "Sonho de Valsa",
        "Ouro Branco",
        "Brigadeiro c/Ouro Branco",
        "Suflair",
        "Suflair c/Ouro Branco",
      ].includes(name)
    )
      return "doces";
    if (
      [
        "Fritas",
        "Fritas c/Cheddar e Bacon",
        "Anéis de Cebola",
        "Anéis de Cebola c/Cheddar e Bacon",
      ].includes(name)
    )
      return "porcoes";
    if (
      name.includes("Lata") ||
      name.includes("litros") ||
      name.includes("Natural") ||
      name.includes("Del Valle") ||
      name.startsWith("Água") ||
      ["Brahma", "Skol", "Império", "Heineken"].includes(name)
    )
      return "bebidas";
    return "salgados";
  };
  const savoryFlavors = [
    "Carne",
    "Frango",
    "Pizza",
    "Calabresa",
    "Queijo",
    "Palmito",
    "Brócolis",
  ];
  const savoryFlavorFor = (name: string) =>
    name.startsWith("Três Queijos") || name.startsWith("Queijo")
      ? "Queijo"
      : savoryFlavors.find((flavor) => name.startsWith(flavor)) || "Carne";
  const productImageFor = (name: string) => {
    const normalized = name.toLowerCase();
    if (categoryFor(name) === "doces") {
      if (normalized.includes("romeu"))
        return "/products/pastel-romeu-e-julieta.png";
      if (normalized.includes("sonho"))
        return "/products/pastel-sonho-de-valsa.png";
      if (normalized.includes("ouro branco"))
        return "/products/pastel-ouro-branco.png";
      if (normalized.includes("suflair")) return "/products/pastel-suflair.png";
      if (normalized.includes("brigadeiro"))
        return "/products/pastel-brigadeiro.png";
      if (normalized.includes("prestígio"))
        return "/products/pastel-prestigio.png";
      return "/products/pastel-doce.png";
    }
    if (categoryFor(name) === "porcoes")
      return normalized.includes("cheddar")
        ? "/products/porcao-fritas-cheddar-bacon.png"
        : normalized.includes("fritas")
          ? "/products/porcao-fritas.png"
          : "/products/porcao-aneis-cebola.png";
    if (categoryFor(name) === "bebidas") {
      if (normalized.includes("coca"))
        return "/products/bebida-coca-cola-lata.png";
      if (normalized.includes("guaraná"))
        return "/products/bebida-guarana-lata.png";
      if (normalized.includes("natural") || normalized.includes("valle"))
        return "/products/bebida-suco-laranja.png";
      if (
        ["brahma", "skol", "império", "heineken"].some((word) =>
          normalized.includes(word),
        )
      )
        return "/products/bebida-cerveja.png";
      return "/products/bebidas-geladas.png";
    }
    if (normalized.includes("bacon") && normalized.includes("queijo")) {
      if (normalized.startsWith("carne"))
        return "/products/pastel-carne-queijo.png";
      if (normalized.startsWith("frango"))
        return "/products/pastel-frango-milho-queijo.png";
      if (normalized.startsWith("pizza"))
        return "/products/pastel-pizza-bacon.png";
      if (normalized.startsWith("calabresa"))
        return "/products/pastel-calabresa-bacon-queijo.png";
      if (normalized.startsWith("palmito"))
        return "/products/pastel-palmito-bacon-queijo.png";
    }
    if (normalized.startsWith("três queijos"))
      return "/products/pastel-tres-queijos.png";
    return `/products/pastel-${savoryFlavorFor(name).toLowerCase().replace("ó", "o")}.png`;
  };
  const normalizeText = (value: string) =>
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const visibleProducts = catalogProducts.filter(
    ([name, , , category]) => {
      const resolvedCategory = normalizeText(category || categoryFor(name));
      const normalizedActiveCategory = normalizeText(activeCategory);
      const resolvedFlavor = normalizeText(savoryFlavorFor(name));
      const normalizedActiveSavory = normalizeText(activeSavory);
      const categoryMatches = resolvedCategory === normalizedActiveCategory ||
        (normalizedActiveCategory === "salgados" && !category);
      return categoryMatches &&
        (normalizedActiveCategory !== "salgados" || resolvedFlavor === normalizedActiveSavory);
    },
  );
  const submitOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameParts = customerName.trim().split(/\s+/).filter(Boolean);
    const tableValue = tableNumber.trim();
    if (nameParts.length < 2) {
      setFormError("Digite seu nome e sobrenome.");
      return;
    }
    if (!isValidBrazilPhone(customerPhone)) {
      setFormError("Digite um telefone celular válido com DDD.");
      return;
    }
    if (!/^\d+$/.test(tableValue)) {
      setFormError("O número da mesa deve conter apenas números.");
      return;
    }
    if (cart.length === 0) {
      setFormError("Adicione pelo menos um item à sacola.");
      return;
    }
    setFormError("");
    setSubmitting(true);
    const supabase = createClient();
    const items = Object.entries(
      cart.reduce<Record<string, number>>(
        (acc, name) => ({ ...acc, [name]: (acc[name] || 0) + 1 }),
        {},
      ),
    ).map(([name, quantity]) => ({
      name,
      quantity,
      unit_price: priceByName[name],
    }));
    const { data, error } = await supabase
      .from("orders")
      .insert({
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim(),
        table_number: tableNumber.trim(),
        notification_preference: notificationPreference,
        customer_comment: customerComment.trim() || null,
        items,
        total,
      });
    setSubmitting(false);
    if (!error) {
      setOrderNumber(null);
      setSubmitted(true);
      setCheckout(false);
      setCart([]);
    } else {
      setFormError(
        "Não foi possível enviar o pedido agora. Confira os dados e tente novamente.",
      );
    }
  };
  const heroScrollLock = useRef(0);
  const handleHeroWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024 || Math.abs(event.deltaY) < 12) return;
    event.preventDefault();
    const now = Date.now();
    if (now - heroScrollLock.current < 420) return;
    heroScrollLock.current = now;
    setHeroFlavor((current) =>
      event.deltaY > 0
        ? (current + 1) % heroSlides.length
        : (current - 1 + heroSlides.length) % heroSlides.length,
    );
  };
  const submitReview = async () => {
    if (!reviewRating || !customerName.trim()) return;
    const { error } = await createClient()
      .from("order_reviews")
      .insert({
        customer_name: customerName.trim(),
        rating: reviewRating,
        comment: reviewComment.trim() || null,
      });
    if (!error) {
      setReviewSent(true);
      setReviewOpen(false);
    }
  };
  if (submitted)
    return (
      <main className="order-success relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111111] px-6 py-12 text-[#FFF4C2]">
        <div className="success-confetti" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <section className="success-card relative z-10 w-full max-w-2xl text-center">
          <div className="success-check mx-auto grid size-24 place-items-center rounded-full bg-[#F5C518] text-5xl font-black text-[#111111]">
            ✓
          </div>
          <p className="mt-9 text-xs font-bold uppercase tracking-[.3em] text-[#F5C518]">
            Pedido recebido
          </p>
          <h1 className="mt-4 font-sans text-5xl font-black uppercase leading-[.9] tracking-[-.06em] sm:text-7xl">
            Obrigado!
            <br />
            <span className="text-[#D92D20]">Já estamos preparando.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-md text-base leading-7 text-[#FFF4C2]/80">
            Seu pedido chegou para a nossa cozinha. Em breve, você terá um
            pastel quentinho nas mãos.
          </p>
          {orderNumber && (
            <p className="mx-auto mt-7 w-fit rounded-full border border-[#F5C518] px-5 py-3 text-sm font-bold">
              Pedido #{String(orderNumber).padStart(5, "0")}
            </p>
          )}
          {!reviewSent ? (
            <button
              type="button"
              onClick={() => setReviewOpen(true)}
              className="mt-6 rounded-full border border-[#F5C518] px-7 py-4 font-bold text-[#FFF4C2] transition hover:bg-[#F5C518] hover:text-[#111111]"
            >
              Deixar avaliação
            </button>
          ) : (
            <p className="mt-6 font-bold text-[#F5C518]">
              Obrigado pela sua avaliação.
            </p>
          )}
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setMenu(true);
              setCustomerName("");
              setCustomerPhone("");
              setTableNumber("");
              setOrderNumber(null);
            }}
            className="mt-10 rounded-full bg-[#D92D20] px-7 py-4 font-bold text-[#FFF4C2] transition hover:bg-[#F5C518] hover:text-[#111111]"
          >
            Fazer novo pedido
          </button>
          {reviewOpen && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="review-title"
              className="fixed inset-0 z-50 grid place-items-center bg-[#111111]/80 px-5"
            >
              <div className="w-full max-w-md rounded-3xl bg-[#FFF4C2] p-6 text-left text-[#111111]">
                <div className="flex items-center justify-between">
                  <h2
                    id="review-title"
                    className="font-serif text-3xl font-bold"
                  >
                    Como foi seu pedido?
                  </h2>
                  <button
                    type="button"
                    onClick={() => setReviewOpen(false)}
                    aria-label="Fechar avaliação"
                    className="text-2xl"
                  >
                    ×
                  </button>
                </div>
                <div
                  className="mt-6 flex gap-1"
                  aria-label="Escolha uma nota de 1 a 5 estrelas"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      aria-label={`${star} estrela${star > 1 ? "s" : ""}`}
                      className={`text-4xl transition ${star <= reviewRating ? "text-[#F5C518]" : "text-[#DDE4D9]"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  value={reviewComment}
                  onChange={(event) => setReviewComment(event.target.value)}
                  rows={4}
                  maxLength={1000}
                  placeholder="Conte como foi sua experiência"
                  className="mt-5 w-full resize-none rounded-2xl border border-[#DDE4D9] bg-white p-4 outline-none focus:border-[#D92D20]"
                />
                <button
                  type="button"
                  disabled={!reviewRating}
                  onClick={submitReview}
                  className="mt-5 w-full rounded-full bg-[#D92D20] px-5 py-4 font-bold text-[#FFF4C2] disabled:opacity-50"
                >
                  Enviar avaliação
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    );
  if (checkout)
    return (
      <main className="checkout-page min-h-screen bg-[#111111] px-6 py-10 text-[#FFF4C2]">
        <section className="mx-auto flex min-h-[80vh] w-full max-w-xl flex-col justify-center">
          <button
            type="button"
            onClick={() => setCheckout(false)}
            className="mb-8 self-start font-bold text-[#F5C518]"
          >
            Voltar ao carrinho
          </button>
          <p className="text-sm font-bold uppercase tracking-[.2em] text-[#F5C518]">
            Finalizar pedido
          </p>
          <h1 className="mt-3 font-serif text-5xl font-bold">
            S�� falta identificar você.
          </h1>
          <p className="mt-4 leading-7 text-[#FFF4C2]/80">
            Preencha seus dados para enviarmos o pedido para a cozinha.
          </p>
          <div className="mt-8 rounded-3xl border border-[#F5C518]/20 bg-white p-5 text-[#111111]">
            <div className="flex items-center justify-between">
              <h2 className="font-bold uppercase tracking-wider">Sua sacola</h2>
              <span className="text-sm font-bold">
                {cart.length} {cart.length === 1 ? "item" : "itens"}
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {cartItems.map(([name, quantity]) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="flex-1">
                    {quantity}x {name}
                  </span>
                  <span className="font-bold">
                    R${" "}
                    {(priceByName[name] * quantity)
                      .toFixed(2)
                      .replace(".", ",")}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remover ${name}`}
                    onClick={() => removeFromCart(name)}
                    className="text-[#D92D20]"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-[#111111]/15 pt-4 font-bold">
              <span>Total</span>
              <span>R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>
          <form onSubmit={submitOrder} className="mt-8 flex flex-col gap-5">
            <label className="flex flex-col gap-2 font-bold">
              Nome e sobrenome
              <input
                required
                value={customerName}
                onChange={(event) => {
                  setCustomerName(event.target.value);
                  setFormError("");
                }}
                className="rounded-2xl border border-[#DDE4D9] bg-white px-4 py-4 font-normal text-[#111111] outline-none placeholder:text-[#6B7280] focus:border-[#D92D20] focus:ring-2 focus:ring-[#D92D20]/20"
                placeholder="Seu nome"
              />
            </label>
            <label className="flex flex-col gap-2 font-bold">
              Observações do pedido
              <textarea
                value={customerComment}
                onChange={(event) => setCustomerComment(event.target.value)}
                rows={3}
                maxLength={500}
                className="resize-none rounded-2xl border border-[#DDE4D9] bg-white px-4 py-4 font-normal text-[#111111] placeholder:text-[#6B7280] outline-none focus:border-[#D92D20] focus:ring-2 focus:ring-[#D92D20]/20"
                placeholder="Ex.: tirar tomate"
              />
            </label>
            <label className="flex flex-col gap-2 font-bold">
              Telefone
              <input
                required
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                className="rounded-2xl border border-[#DDE4D9] bg-white px-4 py-4 font-normal text-[#111111] outline-none placeholder:text-[#6B7280] focus:border-[#D92D20] focus:ring-2 focus:ring-[#D92D20]/20"
                placeholder="(19) 99999-9999"
              />
            </label>
            <label className="flex flex-col gap-2 font-bold">
              Número da mesa
              <input
                required
                value={tableNumber}
                inputMode="numeric"
                pattern="[0-9]+"
                onChange={(event) => {
                  setTableNumber(event.target.value.replace(/\D/g, ""));
                  setFormError("");
                }}
                className="rounded-2xl border border-[#DDE4D9] bg-white px-4 py-4 font-normal text-[#111111] outline-none placeholder:text-[#6B7280] focus:border-[#D92D20] focus:ring-2 focus:ring-[#D92D20]/20"
                placeholder="Ex.: 12"
              />
            </label>
            <fieldset className="flex flex-col gap-3">
              <legend className="font-bold">Como prefere ser avisado?</legend>
              <label
                className={`notification-card ${notificationPreference === "aguardar" ? "notification-card-selected" : ""}`}
              >
                <input
                  className="sr-only"
                  type="radio"
                  name="notification"
                  value="aguardar"
                  checked={notificationPreference === "aguardar"}
                  onChange={() => setNotificationPreference("aguardar")}
                />
                <span className="notification-icon">⌛</span>
                <span>
                  <strong>Vou aguardar no local</strong>
                  <small>Fico por aqui e retiro quando estiver pronto.</small>
                </span>
                <span className="notification-dot" />
              </label>
              <label
                className={`notification-card ${notificationPreference === "ligacao" ? "notification-card-selected" : ""}`}
              >
                <input
                  className="sr-only"
                  type="radio"
                  name="notification"
                  value="ligacao"
                  checked={notificationPreference === "ligacao"}
                  onChange={() => setNotificationPreference("ligacao")}
                />
                <span className="notification-icon">☎</span>
                <span>
                  <strong>Podem me ligar</strong>
                  <small>Avise quando o pedido estiver pronto.</small>
                </span>
                <span className="notification-dot" />
              </label>
            </fieldset>
            {formError && (
              <p
                role="alert"
                className="rounded-2xl bg-[#D92D20]/10 px-4 py-3 text-sm font-bold text-[#D92D20]"
              >
                {formError}
              </p>
            )}
            <button
              disabled={submitting}
              className="mt-3 rounded-2xl bg-gradient-to-r from-[#5A0F0F] via-[#7F1D1D] to-[#3B0707] px-6 py-4 font-bold text-white shadow-[0_10px_24px_rgba(90,15,15,0.28)] transition hover:-translate-y-0.5 hover:from-[#7F1D1D] hover:via-[#991B1B] hover:to-[#5A0F0F] focus:outline-none focus:ring-2 focus:ring-[#D92D20] focus:ring-offset-2 focus:ring-offset-[#111111] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Enviando pedido..." : "Confirmar pedido"}
            </button>
          </form>
        </section>
      </main>
    );
  return (
    <>
      <SitePreloader />
      <main className="min-h-screen bg-[#FFF4C2] text-[#111111]">
        <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-[#FFF4C2] px-6 py-[7px] lg:px-10">
          <a href="#inicio" className="flex items-center gap-3">
            <span className="grid size-14 overflow-hidden rounded-2xl bg-white">
              <img
                src="/pastel-boer-logo.png"
                alt="Logo Pastel Boer"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="font-serif text-2xl font-bold">Pastel Boer</span>
          </a>
          <nav className="hidden gap-8 text-sm font-bold lg:flex">

          </nav>
          <button
            onClick={() =>
              cart.length > 0 ? setCheckout(true) : setMenu(true)
            }
            className="relative flex items-center gap-2 rounded-full bg-[#111111] px-4 py-3 text-sm font-bold text-white"
          >
            <ShoppingBag size={17} /> Sacola
            {cart.length > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-[#D92D20] text-[10px]">
                {cart.length}
              </span>
            )}
          </button>
        </header>
        {!menu ? (
          <>
            <section
              id="inicio"
              className="relative min-h-[calc(100vh-90px)] overflow-hidden bg-[#F5C518] px-6 py-2 text-[#FFF4C2] lg:px-6"
              style={{ paddingTop: '-11px', paddingBottom: '8px' }}
            >
              <div className="mx-auto flex max-w-[1480px] flex-col">
                <div className="relative flex min-h-[calc(100vh-150px)] flex-col justify-center py-5 lg:block lg:py-0" style={{ paddingTop: '17px' }}>
                  <div className="relative z-10 max-w-[390px] lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2">
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em]">Feito para dar água na boca</p>
                    <h1 className="font-sans max-w-[300px] text-[clamp(3.1rem,13.5vw,8.5rem)] font-black uppercase leading-[0.9] tracking-[-0.046em] lg:text-[clamp(4rem,7.5vw,7rem)]" style={{ fontFamily: 'system-ui' }}>O pastel<br />que <span className="text-[#FFF8EE]">você</span><br />vai lembrar<br />amanhã.</h1>
                    <button onClick={() => setMenu(true)} className="mt-6 inline-flex items-center gap-3 border border-white bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#D92D20] transition hover:bg-[#D92D20] hover:text-white">Conheça nosso cardápio <ArrowRight size={16} /></button>
                  </div>
                  <div onWheel={handleHeroWheel} className="relative min-h-[360px] w-full overflow-hidden bg-[#F5C518] lg:min-h-[520px] lg:flex-1" style={{ backgroundColor: currentHero.color, transition: 'background-color 220ms ease' }} aria-label="Role o mouse para trocar o sabor do pastel">
                    <div className="pointer-events-none absolute inset-0"><img key={currentHero.image} src={currentHero.image} alt={`Pastel sabor ${currentHero.name}`} loading="eager" decoding="async" fetchPriority="high" className="hero-pastel-float absolute left-[76%] top-[46%] z-10 h-[160px] w-[230px] -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] object-contain drop-shadow-[0_24px_14px_rgba(87,42,23,0.28)] lg:left-auto lg:right-[3%] lg:top-[calc(58%+200px)] lg:h-[450px] lg:w-[660px] lg:translate-x-0 lg:rotate-[-8deg]" /></div>
                    <div className="absolute bottom-[67px] left-1/2 z-20 flex -translate-x-1/2 items-center justify-center lg:hidden"><div className="pointer-events-auto flex gap-2"><button type="button" aria-label="Pastel anterior" onClick={() => setHeroFlavor((heroFlavor - 1 + heroSlides.length) % heroSlides.length)} className="grid size-12 place-items-center rounded-full border border-[#8F1D1D] bg-[#B42323] text-2xl font-black leading-none text-white shadow-md transition hover:bg-[#8F1D1D] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/80">←</button><button type="button" aria-label="Próximo pastel" onClick={() => setHeroFlavor((heroFlavor + 1) % heroSlides.length)} className="grid size-12 place-items-center rounded-full border border-[#8F1D1D] bg-[#B42323] text-2xl font-black leading-none text-white shadow-md transition hover:bg-[#8F1D1D] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/80">→</button></div></div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
            <button
              onClick={() => setMenu(false)}
              className="mb-8 font-bold text-[#D92D20]"
            >
              ← Voltar para a casa
            </button>
            <h1 className="font-serif text-5xl font-bold">
              Escolha o seu favorito.
            </h1>
            <div
              role="tablist"
              aria-label="Categorias do cardápio"
              className="mt-8 flex gap-2 overflow-x-auto pb-2"
            >
              {[
                ["salgados", "Pastéis salgados"],
                ["doces", "Pastéis doces"],
                ["porcoes", "Porções"],
                ["bebidas", "Bebidas"],
              ].map(([value, label]) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === value}
                  key={value}
                  onClick={() => setActiveCategory(value)}
                  className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold transition ${activeCategory === value ? "bg-[#D92D20] text-white" : "bg-[#FFF4C2] text-[#111111] hover:bg-[#F5C518]"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            {activeCategory === "salgados" && (
              <div
                role="tablist"
                aria-label="Sabores de pastéis salgados"
                className="mt-5 flex gap-2 overflow-x-auto border-b border-[#DDE4D9] pb-3"
              >
                {savoryFlavors.map((flavor) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeSavory === flavor}
                    key={flavor}
                    onClick={() => setActiveSavory(flavor)}
                    className={`whitespace-nowrap px-3 py-2 text-sm font-bold ${activeSavory === flavor ? "border-b-2 border-[#D92D20] text-[#D92D20]" : "text-[#5A1A16] hover:text-[#111111]"}`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {visibleProducts.map(
                ([name, description, price, , , image_url]) => (
<article
                    key={name}
                    className="rounded-2xl border border-[#DDE4D9] bg-white p-3 text-left transition hover:-translate-y-1 hover:border-[#D92D20] hover:shadow-lg"
                  >
                    <div className="flex h-24 items-center justify-center overflow-hidden rounded-2xl bg-white">
                      <img
                        src={image_url || productImageFor(name)}
                        alt={`Pastel ${name}`}
                        className="h-full w-full object-contain"
                        onError={(event) => {
                          event.currentTarget.src =
                            categoryFor(name) === "doces"
                              ? "/products/pastel-doce.png"
                              : `/products/pastel-${savoryFlavorFor(name).toLowerCase().replace("ó", "o")}.png`;
                        }}
                      />
                    </div>
                    <h2 className="mt-5 font-serif text-xl font-bold">
                      {name}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#5A1A16]">
                      {description}
                    </p>
                    <strong className="mt-4 block text-[#D92D20]">
                      {price}
                    </strong>
                    <div className="mt-4 flex items-center justify-between rounded-xl bg-[#FFF4C2] px-3 py-2">
                      <div className="flex items-center gap-3">
                        <button type="button" aria-label={`Remover ${name}`} onClick={() => decreaseFromCart(name)} className="grid size-8 place-items-center rounded-full bg-[#D92D20] text-lg font-black text-white">−</button>
                        <strong className="min-w-5 text-center text-lg text-[#111111]">{quantityFor(name)}</strong>
                        <button type="button" aria-label={`Adicionar ${name}`} onClick={() => addToCart(name)} className="grid size-8 place-items-center rounded-full bg-[#D92D20] text-lg font-black text-white">+</button>
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
            {cart.length > 0 && (
              <div className="mt-8 rounded-2xl bg-[#111111] p-5 text-white">
                <strong>{cart.length} item(ns) no pedido</strong>
                <div className="mt-3 flex flex-col gap-1 text-sm text-[#FFF4C2]">
                  {Object.entries(
                    cart.reduce<Record<string, number>>(
                      (acc, name) => ({ ...acc, [name]: (acc[name] || 0) + 1 }),
                      {},
                    ),
                  ).map(([name, quantity]) => (
                    <p key={name}>
                      {quantity}x {name}
                    </p>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-4">
                  <strong>
                    Total: R$ {total.toFixed(2).replace(".", ",")}
                  </strong>
                  <button
                    type="button"
                    onClick={() => setCheckout(true)}
                    className="rounded-full bg-[#F5C518] px-4 py-2 text-sm font-bold text-[#111111]"
                  >
                    Confirmar pedido
                  </button>
                </div>
              </div>
            )}
            {checkout && (
              <div className="mt-6 rounded-3xl border border-[#DDE4D9] bg-white p-6">
                <h2 className="font-serif text-2xl font-bold">
                  Finalizar pedido
                </h2>
                <p className="mt-2 text-sm text-[#5A1A16]">
                  Informe seus dados para enviarmos o pedido ao balcão.
                </p>
                {submitted ? (
                  <div
                    role="status"
                    className="mt-5 rounded-2xl bg-[#FFF4C2] p-4 font-bold"
                  >
                    Pedido enviado com sucesso. Aguarde a confirmação da Pastel
                    Boer.
                  </div>
                ) : (
                  <form
                    onSubmit={submitOrder}
                    className="mt-5 flex flex-col gap-4"
                  >
                    <label className="text-sm font-bold">
                      Nome
                      <input
                        required
                        value={customerName}
                        onChange={(event) => {
                          setCustomerName(event.target.value);
                          setFormError("");
                        }}
                        className="mt-2 w-full rounded-xl border border-[#DDE4D9] p-3 text-[#111111] outline-none focus:border-[#D92D20]"
                      />
                    </label>
                    <label className="text-sm font-bold">
                      Telefone
                      <input
                        required
                        value={customerPhone}
                        onChange={(event) =>
                          setCustomerPhone(event.target.value)
                        }
                        type="tel"
                        className="mt-2 w-full rounded-xl border border-[#DDE4D9] p-3 text-[#111111] outline-none focus:border-[#D92D20]"
                      />
                    </label>
                    <button
                      disabled={submitting}
                      className="rounded-full bg-[#D92D20] px-5 py-3 font-bold text-white disabled:opacity-60"
                    >
                      {submitting ? "Enviando..." : "Enviar pedido"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
}
