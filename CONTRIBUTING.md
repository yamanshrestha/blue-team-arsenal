# Contributing to Blue Team Arsenal

Thank you for your interest in contributing! Here are some guidelines to help you get started.

## How to Contribute

### Adding New Tools

1. Fork the repository
2. Add your tool to `src/data/tools.ts` following the existing format:
   ```typescript
   {
     id: 'unique-id',
     name: 'Tool Name',
     description: 'Short description',
     longDescription: 'Longer description (optional)',
     category: 'category-id',
     pricing: 'free | freemium | paid',
     website: 'https://example.com',
     features: ['Feature 1', 'Feature 2'],
   }
   ```

3. Ensure the category exists in `src/data/categories.ts`
4. Submit a pull request with a clear description of the tool

### Submitting Issues

Found a bug? Have a suggestion? Open an issue with:
- Clear description of the problem/suggestion
- Steps to reproduce (if applicable)
- Expected vs actual behavior

### Pull Request Process

1. Create a feature branch (`git checkout -b feature/add-tool`)
2. Make your changes
3. Test locally
4. Commit with clear messages
5. Push to your fork
6. Open a pull request

## Code Style

- Use TypeScript
- Follow existing naming conventions
- Keep components and data organized by type
- Format with Prettier (configured in project)

## Let Us Know You're Using It!

If you're using Blue Team Arsenal in your project or organization, we'd love to hear about it! Please consider:
- Opening a discussion issue with how you're using it
- Adding your project to a "Projects Using Blue Team Arsenal" section (coming soon)
- Sharing feedback and suggestions

This helps us understand the impact and improve the project for everyone.

## Questions?

Open an issue or start a discussion in the repository. We're here to help!

---

**License:** MIT - See [LICENSE](LICENSE) for details
