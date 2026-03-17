export class Slug {
  public text: string

  constructor(text: string) {
    this.text = text
  }

  /**
   * Receives a string and normalize it as a slug
   * Example: "How to create a slug?" => "how-to-create-a-slug"
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}
