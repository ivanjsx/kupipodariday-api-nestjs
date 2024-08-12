// libraries
import escape from 'escape-html';

// decorators
import { IsNotEmpty, IsString } from 'class-validator';

// types
import { EscapableDto } from 'src/common/types';

// content

export class SearchUserDto extends EscapableDto {
  @IsString()
  @IsNotEmpty()
  query: string;

  public escapeFields(): this {
    const { query } = this;
    return {
      query: escape(query),
    } as this;
  }
}
