export const useUseHelpers = () => {
  const formatDate = (dateString: string, dateFormat: string | null) => {
    if (!dateString) return "";

    if (!dateFormat) {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // Formatar a data de acordo com o formato fornecido
    const date = new Date(dateString);

    // Mapeia os tokens de formato para seus valores correspondentes
    const formatTokens: Record<string, () => string> = {
      YYYY: () => date.getFullYear().toString(),
      YY: () => date.getFullYear().toString().slice(-2),
      MM: () => (date.getMonth() + 1).toString().padStart(2, "0"),
      M: () => (date.getMonth() + 1).toString(),
      DD: () => date.getDate().toString().padStart(2, "0"),
      D: () => date.getDate().toString(),
      HH: () => date.getHours().toString().padStart(2, "0"),
      H: () => date.getHours().toString(),
      mm: () => date.getMinutes().toString().padStart(2, "0"),
      m: () => date.getMinutes().toString(),
      ss: () => date.getSeconds().toString().padStart(2, "0"),
      s: () => date.getSeconds().toString(),
      ddd: () =>
        ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][date.getDay()],
      dddd: () =>
        [
          "Domingo",
          "Segunda-feira",
          "Terça-feira",
          "Quarta-feira",
          "Quinta-feira",
          "Sexta-feira",
          "Sábado",
        ][date.getDay()],
      MMM: () =>
        [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ][date.getMonth()],
      MMMM: () =>
        [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ][date.getMonth()],
    };

    // Ordenar tokens por comprimento para evitar substituições parciais
    const tokens = Object.keys(formatTokens).sort(
      (a, b) => b.length - a.length
    );

    // Substituir cada token pelo valor correspondente
    let formattedDate = dateFormat;
    for (const token of tokens) {
      const regex = new RegExp(token, "g");
      formattedDate = formattedDate.replace(regex, formatTokens[token]());
    }

    return formattedDate;
  };

  return { formatDate };
};
