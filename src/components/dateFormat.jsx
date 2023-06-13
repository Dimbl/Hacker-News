

export const dateFormat = (a) => {
      const d = new Date(a * 1000);
      return (
        d.getHours() +
        ":" +
        (d.getMinutes() < 10 ? "0" : "") +
        d.getMinutes() +
        " " +
        d.toLocaleDateString()
      );
    };