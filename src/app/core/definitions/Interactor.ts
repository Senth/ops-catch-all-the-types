export abstract class Interactor<InputType, OutputType, RepoType> {
  protected repository: RepoType
  protected input!: InputType

  public constructor(repository: RepoType) {
    this.repository = repository
  }

  /**
   * Execute the use case
   * @param input input from the adapter
   * @return {Promise.<OutputType>}
   */
  public abstract execute(input: InputType): Promise<OutputType>
}
